import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { getMostPopularAction } from "@/app/_actions/get/get-most-popular-action";

export const getMostPopular = async() => {
  return await getMostPopularAction();
};

export const getMostPopularQueryOptions = () => {
  return queryOptions({
    queryKey: ["MostPopular"],
    queryFn: () => getMostPopular(),
  });
};

type UseMostPopularOptions = {
  queryConfig?: QueryConfig<typeof getMostPopularQueryOptions>;
};

export const useMostPopular = ({ queryConfig }: UseMostPopularOptions) => {
  return useQuery({
    ...getMostPopularQueryOptions(),
    ...queryConfig,
  });
};
