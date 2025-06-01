import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllCategoryQueryOptions } from "../../_api/get-all-categories";

export const preloadOrderData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllCategoryQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
