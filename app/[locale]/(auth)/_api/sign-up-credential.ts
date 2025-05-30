import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { SignUpSchemeInput } from "../_utils/auth-schemes";
import { signIn as Sn } from "next-auth/react";
import SignUpWithCredential from "../../../../server-actions/auth/sign-up-credential";
import { authUserQueryOptions } from "@/server-actions/auth/get-user";

export const signUp = async ({ data }: { data: SignUpSchemeInput }) => {
  const result = await SignUpWithCredential({ value: data });
  if (result?.error) {
    throw new Error(result?.code);
  }
  const formattedData = {
    email_or_phone: data.email,
    password: data.password,
  };
  const signInResult = await Sn("credentials", {
    ...formattedData,
    redirect: false,
  });

  if (signInResult?.error) {
    throw new Error("sign-in-failed");
  }
};

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signUp>;
};

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
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
    mutationFn: signUp,
  });
};
