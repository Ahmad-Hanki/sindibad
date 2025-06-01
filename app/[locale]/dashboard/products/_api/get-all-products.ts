import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { getAllProductsAction } from "@/server-actions/get/get-all-producats";

export const getAllProducts = async (categoryId?: string) => {
  const allProducts = await getAllProductsAction();

  if (!categoryId) return allProducts;

  return allProducts?.filter((product) => product.categoryId === categoryId);
};

export const getAllProductsQueryOptions = (categoryId?: string) => {
  return queryOptions({
    queryKey: ["AllProducts", categoryId],
    queryFn: () => getAllProducts(categoryId),
  });
};
type UseAllProductsOptions = {
  categoryId?: string;
  queryConfig?: QueryConfig<typeof getAllProductsQueryOptions>;
};

export const useAllProducts = ({
  categoryId,
  queryConfig,
}: UseAllProductsOptions) => {
  return useQuery({
    ...getAllProductsQueryOptions(categoryId),
    ...queryConfig,
  });
};
