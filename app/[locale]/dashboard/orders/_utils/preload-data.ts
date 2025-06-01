import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllOrdersQueryOptions } from "../_api/get-all-orders";

export const preloadOrderData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllOrdersQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
