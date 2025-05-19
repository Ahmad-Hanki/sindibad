"use client";
import { GoogleSignIn } from "../_components/google-signIn";
import { useForm } from "react-hook-form";
import { signInScheme, SignInSchemeInput } from "../_utils/auth-schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignIn } from "../_api/sign-in-credential";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const SignInClient = ({ locale }: { locale: string }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignInSchemeInput>({
    resolver: zodResolver(signInScheme(locale)),
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignIn({
    mutationConfig: {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        setErrorMessage(error.message || "An unknown error occurred");
        console.log(error);
      },
    },
  });

  async function onSubmit(values: SignInSchemeInput) {
    mutate({ data: values });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {" "}
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {/* Email/Password Sign In */}
        <FormField
          control={form.control}
          name="email_or_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Email or Username"
                  : locale == "ar"
                  ? "البريد الإلكتروني أو اسم المستخدم"
                  : "E-posta veya Kullanıcı Adı"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Password"
                  : locale == "ar"
                  ? " كلمة المرور"
                  : "Şifre"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with Google
            </span>
          </div>
        </div>
        <GoogleSignIn />
        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInClient;
