"use client";
import { GoogleSignIn } from "./google-signIn";
import { useForm } from "react-hook-form";
import { signUpScheme, SignUpSchemeInput } from "../_utils/auth-schemes";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "@bprogress/next";
import { useSignUp } from "../_api/sign-up-credential";
import { useToast } from "@/hooks/use-toast";

const SignUpClient = ({ locale }: { locale: string }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<SignUpSchemeInput>({
    resolver: zodResolver(signUpScheme(locale)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const { mutateAsync, isPending } = useSignUp({
    mutationConfig: {
      onSuccess: (data) => {
        toast({ title: "Signed up successfully" });
        router.push("/");
      },

      onError: (error) => {
        console.log(error);
        // error might be include
        // email_exists
        // username_exists
        // unknown_error
        // sign-in-failed
        const errorMessage: string = error.toString();

        if (errorMessage.includes("email_exists")) {
          setErrorMessage(
            locale == "en"
              ? "Email already exists"
              : locale == "ar"
              ? "البريد الإلكتروني موجود بالفعل"
              : "E-posta zaten mevcut"
          );
          form.setError("email", {
            message:
              locale == "en"
                ? "Email already exists"
                : locale == "ar"
                ? "البريد الإلكتروني موجود بالفعل"
                : "E-posta zaten mevcut",
          });
        } else if (errorMessage.includes("username_exists")) {
          setErrorMessage(
            locale == "en"
              ? "Username already exists"
              : locale == "ar"
              ? "اسم المستخدم موجود بالفعل"
              : "Kullanıcı adı zaten mevcut"
          );
          form.setError("username", {
            message:
              locale == "en"
                ? "Username already exists"
                : locale == "ar"
                ? "اسم المستخدم موجود بالفعل"
                : "Kullanıcı adı zaten mevcut",
          });
        } else if (errorMessage.includes("sign-in-failed")) {
          setErrorMessage(
            locale == "en"
              ? "Sign in failed"
              : locale == "ar"
              ? "فشل تسجيل الدخول"
              : "Giriş başarısız oldu"
          );
        } else {
          setErrorMessage(
            locale == "en"
              ? "Unknown error occurred"
              : locale == "ar"
              ? "حدث خطأ غير معروف"
              : "Bilinmeyen bir hata oluştu"
          );
        }
      },
    },
  });

  async function onSubmit(values: SignUpSchemeInput) {
    await mutateAsync({ data: values });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {" "}
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {/* Email/Password Sign In */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Email"
                  : locale == "ar"
                  ? "البريد الإلكتروني"
                  : "E-posta"}
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Username"
                  : locale == "ar"
                  ? "اسم المستخدم"
                  : "Kullanıcı adı"}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en" ? "Name" : locale == "ar" ? "الاسم" : "İsim"}
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
        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}
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
            <Link href="/sign-in">Already have an account? Sign In</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpClient;
