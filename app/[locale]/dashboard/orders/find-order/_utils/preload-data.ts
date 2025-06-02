import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getOneOrderQueryOptions } from "../_api/get-order-by-random-id";

export const preloadOneOrderData = async ({ orderId }: { orderId: string }) => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getOneOrderQueryOptions({ orderId })),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
