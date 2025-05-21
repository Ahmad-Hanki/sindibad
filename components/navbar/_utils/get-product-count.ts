import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getProductCountAction from "./get-product-count-action";

export const getCartCount = async ({ userId }: { userId: string }) => {
  return await getProductCountAction(userId);
};

export const getCartCountQueryOptions = ({ userId }: { userId: string }) => {
  return queryOptions({
    queryKey: ["cartCount", userId],
    queryFn: () => getCartCount({ userId }),
  });
};

type UseCartCountUserOptions = {
  queryConfig?: QueryConfig<typeof getCartCountQueryOptions>;
  userId: string;
};

export const useCartCount = ({
  queryConfig,
  userId,
}: UseCartCountUserOptions) => {
  return useQuery({
    ...getCartCountQueryOptions({ userId }),
    ...queryConfig,
  });
};
