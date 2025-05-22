import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { SignInSchemeInput } from "../_utils/auth-schemes";
import { signIn as Sn } from "next-auth/react";
import { authUserQueryOptions } from "@/server-actions/auth/get-user";

export const signIn = async ({ data }: { data: SignInSchemeInput }) => {
  const result = await Sn("credentials", {
    ...data,
    redirect: false,
  });
  if (result?.error) {
    throw new Error();
  }
  return result;
};

type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signIn>;
};

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: authUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signIn,
  });
};
