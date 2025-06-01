import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllProductsQueryOptions } from "../../dashboard/products/_api/get-all-products";


export const preloadMenuData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getAllProductsQueryOptions()),
    // queryClient.prefetchQuery(getAllCategoryQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
