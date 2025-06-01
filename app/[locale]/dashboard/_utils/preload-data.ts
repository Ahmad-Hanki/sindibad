import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllProductsQueryOptions } from "../products/_api/get-all-products";
import { getAllCategoryQueryOptions } from "../_api/get-all-categories";

export const preloadDashboardData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllProductsQueryOptions()),
    queryClient.prefetchQuery(getAllCategoryQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
