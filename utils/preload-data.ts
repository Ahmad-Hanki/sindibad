import { dehydrate, QueryClient } from "@tanstack/react-query";
import { authUserQueryOptions } from "./get-user";

export const preloadLayout = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [queryClient.prefetchQuery(authUserQueryOptions())];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
