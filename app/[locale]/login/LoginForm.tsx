"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import loginAction from "./loginAction";
import SubmitButton from "@/components/SubmitButton";
import { useLocale } from "next-intl";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
export function LoginForm() {
  const [hidden, setHidden] = useState(true);
  const { toast } = useToast();

  const locale = useLocale();
  const submit =
    locale === "en" ? "Login" : locale === "ar" ? "تسجيل الدخول" : "otur aç";

  const submitted = async (formData: FormData) => {
    const password = formData.get("password") as string;

    if (!password) {
      toast({
        title: locale === "en" ? "Error" : locale === "ar" ? "خطأ" : "Hata",
        description:
          locale === "en"
            ? "Please enter a password"
            : locale === "ar"
            ? "الرجاء إدخال كلمة مرور"
            : "Lütfen bir şifre girin",
      });

      return;
    }

    const res = await loginAction(password);

    if (!res) {
      toast({
        title: locale === "en" ? "Error" : locale === "ar" ? "خطأ" : "Hata",
        description:
          locale === "en"
            ? "Invalid password"
            : locale === "ar"
            ? "كلمة مرور غير صالحة"
            : "Geçersiz şifre",
      });
    } else {
      redirect("/dashboard");
    }
  };
  return (
    <form action={submitted} className="space-y-6 min-w-[350px]">
      <div className="flex flex-col gap-2">
        <label className="font-semibold " htmlFor="password">
          {locale === "en"
            ? "Password"
            : locale === "ar"
            ? "كلمة المرور"
            : "şifre"}
        </label>

        <div className="relative min-w-full h-[40px] ">
          <EyeOff
            className="absolute inset-y-0 left-0 w-6 h-6 m-2 text-gray-500 cursor-pointer z-20"
            onClick={() => setHidden((prev) => !prev)}
          />
          <Input
            id="password"
            type={hidden ? "password" : "text"}
            name="password"
            required
            className="absolute inset-0 w-full h-full pl-10 text-lg"
          />
        </div>
      </div>
      <SubmitButton type="submit" submit={submit} />
    </form>
  );
}
