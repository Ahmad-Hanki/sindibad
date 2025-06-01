import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import GetAllOrderDataAction from "@/server-actions/get/get-all-order-actions";

export const getAllOrders = async () => {
  return await GetAllOrderDataAction();
};

export const getAllOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["AllOrders"],
    queryFn: () => getAllOrders(),
  });
};
type UseAllOrdersOptions = {
  categoryId?: string;
  queryConfig?: QueryConfig<typeof getAllOrdersQueryOptions>;
};

export const useAllOrders = ({ queryConfig }: UseAllOrdersOptions) => {
  return useQuery({
    ...getAllOrdersQueryOptions(),
    ...queryConfig,
  });
};
