import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { authUserQueryOptions } from "@/server-actions/auth/get-user";

import SignOutAction from "@/server-actions/auth/sign-out-action";

export const signOut = async () => {
  await SignOutAction();
};

type UseSignOutOptions = {
  mutationConfig?: MutationConfig<typeof signOut>;
};

export const useSignOut = ({ mutationConfig }: UseSignOutOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: authUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signOut,
  });
};
