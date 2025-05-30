import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getOrdersCountAction from "@/server-actions/get/get-order-count-action";

export const getOrderCount = async ({ userId }: { userId: string }) => {
  return await getOrdersCountAction(userId);
};

export const getOrderCountQueryOptions = ({ userId }: { userId: string }) => {
  return queryOptions({
    queryKey: ["orderCount", userId],
    queryFn: () => getOrderCount({ userId }),
  });
};

type UseOrderCountUserOptions = {
  queryConfig?: QueryConfig<typeof getOrderCountQueryOptions>;
  userId: string;
};

export const useOrderCount = ({
  queryConfig,
  userId,
}: UseOrderCountUserOptions) => {
  return useQuery({
    ...getOrderCountQueryOptions({ userId }),
    ...queryConfig,
  });
};
