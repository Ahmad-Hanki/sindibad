import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { SignInSchemeInput } from "../_utils/auth-schemes";
import { signIn as Sn } from "next-auth/react";

export const signIn = async ({ data }: { data: SignInSchemeInput }) => {
  const result = await Sn("credentials", {
    ...data,
    redirect: false,
  });
  if (result?.error) {
    console.log(result);
    throw new Error();
  }
  return result;
};

type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signIn>;
};

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signIn,
  });
};
