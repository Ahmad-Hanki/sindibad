import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getCartData from "@/server-actions/get/get-cart-data-action";

export const getAllCartData = async (userId: string) => {
  const cartData = await getCartData(userId);
  return cartData;
};

export const getAllCartDataQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: ["cartData", userId],
    queryFn: () => getAllCartData(userId),
  });
};
type UseAllCartDataOptions = {
  userId: string;
  queryConfig?: QueryConfig<typeof getAllCartDataQueryOptions>;
};

export const useAllCartData = ({
  userId,
  queryConfig,
}: UseAllCartDataOptions) => {
  return useQuery({
    ...getAllCartDataQueryOptions(userId),
    ...queryConfig,
  });
};
