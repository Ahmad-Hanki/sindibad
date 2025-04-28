import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { getAllProductsAction } from "@/server-actions/get/get-all-producats";

export const getAllProducts = async () => {
  return await getAllProductsAction();
};

export const getAllProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["AllProducts"],
    queryFn: () => getAllProducts(),
  });
};

type UseAllProductsOptions = {
  queryConfig?: QueryConfig<typeof getAllProductsQueryOptions>;
};

export const useAllProducts = ({ queryConfig }: UseAllProductsOptions) => {
  return useQuery({
    ...getAllProductsQueryOptions(),
    ...queryConfig,
  });
};
