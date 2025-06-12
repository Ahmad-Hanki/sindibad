import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getUserAction from "./get-user-action";

export const getCurrentUser = async () => {
  return await getUserAction();
};

export const authUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
};

type UseAuthUserOptions = {
  queryConfig?: QueryConfig<typeof authUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseAuthUserOptions) => {
  return useQuery({
    ...authUserQueryOptions(),
    ...queryConfig,
  });
};
export type GetUserType = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;
