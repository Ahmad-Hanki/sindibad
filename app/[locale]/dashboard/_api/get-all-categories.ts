import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { getAllCategoriesAction } from "@/server-actions/get/get-all-categories-action";

export const getAllCategory = async () => {
  return await getAllCategoriesAction();
};

export const getAllCategoryQueryOptions = () => {
  return queryOptions({
    queryKey: ["AllCategory"],
    queryFn: () => getAllCategory(),
  });
};

type UseAllCategoryOptions = {
  queryConfig?: QueryConfig<typeof getAllCategoryQueryOptions>;
};

export const useAllCategory = ({ queryConfig }: UseAllCategoryOptions) => {
  return useQuery({
    ...getAllCategoryQueryOptions(),
    ...queryConfig,
  });
};
