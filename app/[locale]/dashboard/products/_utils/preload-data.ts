import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAllProductsQueryOptions } from "../_api/get-all-products";
import { getAllCategoryQueryOptions } from "../../_api/get-all-categories";

export const preloadProductData = async () => {
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
