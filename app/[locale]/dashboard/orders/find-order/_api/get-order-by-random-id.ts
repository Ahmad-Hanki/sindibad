import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import GetOrderByRandomIdAction from "@/server-actions/get/get-order-by-random-id-action";

export const getOneOrder = async ({ orderId }: { orderId: string }) => {
  return await GetOrderByRandomIdAction(orderId);
};

export const getOneOrderQueryOptions = ({ orderId }: { orderId: string }) => {
  return queryOptions({
    queryKey: ["OnrOrder", orderId],
    queryFn: () => getOneOrder({ orderId }),
  });
};
type UseOneOrderOptions = {
  orderId: string;
  queryConfig?: QueryConfig<typeof getOneOrderQueryOptions>;
};

export const useOneOrder = ({ queryConfig, orderId }: UseOneOrderOptions) => {
  return useQuery({
    ...getOneOrderQueryOptions({ orderId }),
    ...queryConfig,
  });
};
