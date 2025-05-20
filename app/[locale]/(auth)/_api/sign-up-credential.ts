import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { SignUpSchemeInput } from "../_utils/auth-schemes";
import { signIn as Sn } from "next-auth/react";
import SignUpWithCredential from "../_actions/sign-up-credential";

export const signUp = async ({ data }: { data: SignUpSchemeInput }) => {
  const result = await SignUpWithCredential({ value: data });
  if (result?.error) {
    throw new Error(result?.code);
  }
  const formattedData = {
    email_or_username: data.email,
    password: data.password,
  };
  const signInResult = await Sn("credentials", {
    ...formattedData,
    redirect: false,
  });

  console.log("signInResult", signInResult);

  if (signInResult?.error) {
    throw new Error("sign-in-failed");
  }
};

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signUp>;
};

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signUp,
  });
};
