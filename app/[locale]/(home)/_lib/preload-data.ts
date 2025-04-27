import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMostPopularQueryOptions } from "../_api/get-most-popular";

export const preloadHomeData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getMostPopularQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
