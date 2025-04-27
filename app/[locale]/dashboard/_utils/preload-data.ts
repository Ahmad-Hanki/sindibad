import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllProductsQueryOptions } from "../_api/get-all-products";

export const preloadDashboardData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllProductsQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
