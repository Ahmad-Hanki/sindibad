import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { getAllOrdersAction } from "@/server-actions/get/get-all-orders";

export const getAllOrders = async () => {
  return await getAllOrdersAction();
};
export const getAllOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["AllOrders"],
    queryFn: () => getAllOrders(),
  });
};
type UseAllOrdersOptions = {
  queryConfig?: QueryConfig<typeof getAllOrdersQueryOptions>;
};
export const useAllOrders = ({ queryConfig }: UseAllOrdersOptions) => {
  return useQuery({
    ...getAllOrdersQueryOptions(),
    ...queryConfig,
  });
};
