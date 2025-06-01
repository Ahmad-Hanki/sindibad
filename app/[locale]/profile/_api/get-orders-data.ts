import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getOrderData from "@/server-actions/get/get-orders-data-action";

export const getAllOrderData = async (userId: string) => {
  const orderData = await getOrderData(userId);
  return orderData;
};

export const getAllOrderDataQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: ["orderData", userId],
    queryFn: () => getAllOrderData(userId),
  });
};
type UseAllOrderDataOptions = {
  userId: string;
  queryConfig?: QueryConfig<typeof getAllOrderDataQueryOptions>;
};

export const useAllOrderData = ({
  userId,
  queryConfig,
}: UseAllOrderDataOptions) => {
  return useQuery({
    ...getAllOrderDataQueryOptions(userId),
    ...queryConfig,
  });
};
