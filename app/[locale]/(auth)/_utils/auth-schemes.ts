import { z } from "zod";

export const signInScheme = (locale: string) => {
  return z.object({
    email_or_username: z.string().min(3, {
      message:
        locale == "en"
          ? "Minimum 3 characters"
          : locale == "ar"
          ? "حد أدنى 3 أحرف"
          : "Minimum 3 karakter",
    }),

    password: z.string().min(1, {
      message:
        locale == "en"
          ? "Password is required"
          : locale == "ar"
          ? "كلمة المرور مطلوبة"
          : "Şifre gerekli",
    }),
  });
};

export type SignInSchemeInput = z.infer<ReturnType<typeof signInScheme>>;

export const signUpScheme = (locale: string) => {
  return z.object({
    email: z.string().email({
      message:
        locale == "en"
          ? "Invalid email address"
          : locale == "ar"
          ? "عنوان بريد إلكتروني غير صالح"
          : "Geçersiz e-posta adresi",
    }),
    name: z.string().min(3, {
      message:
        locale == "en"
          ? "Minimum 3 characters"
          : locale == "ar"
          ? "حد أدنى 3 أحرف"
          : "Minimum 3 karakter",
    }),
    username: z.string().min(3, {
      message:
        locale == "en"
          ? "Minimum 3 characters"
          : locale == "ar"
          ? "حد أدنى 3 أحرف"
          : "Minimum 3 karakter",
    }),
    password: z.string().min(1, {
      message:
        locale == "en"
          ? "Password is required"
          : locale == "ar"
          ? "كلمة المرور مطلوبة"
          : "Şifre gerekli",
    }),
  });
};

export type SignUpSchemeInput = z.infer<ReturnType<typeof signUpScheme>>;
