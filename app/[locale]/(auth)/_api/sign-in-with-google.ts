import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { signIn } from "next-auth/react";
import { authUserQueryOptions } from "@/server-actions/auth/get-user";

export const signInWithGoogle = async () => {
  return await signIn("google");
};

type UseSignWithGoogleInOptions = {
  mutationConfig?: MutationConfig<typeof signInWithGoogle>;
};

export const useSignInWithGoogle = ({
  mutationConfig,
}: UseSignWithGoogleInOptions = {}) => {
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
    mutationFn: signInWithGoogle,
  });
};
