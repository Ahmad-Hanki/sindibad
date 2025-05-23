import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllCartDataQueryOptions } from "../_api/get-cart-data";

export const preloadCartData = async ({ userId }: { userId: string }) => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllCartDataQueryOptions(userId)),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
