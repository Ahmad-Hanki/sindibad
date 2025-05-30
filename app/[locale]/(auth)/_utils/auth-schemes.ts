import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const emailOrTurkishPhoneRegex = /^(?:\d{10}|[\w-.]+@([\w-]+\.)+[\w-]{2,4})$/;

export const signInScheme = (locale: string) => {
  const getErrorMessage = (en: string, ar: string, tr: string) =>
    locale === "en" ? en : locale === "ar" ? ar : tr;


  return z.object({
    email_or_phone: z
      .string()
      .refine((value) => emailOrTurkishPhoneRegex.test(value), {
        message: getErrorMessage(
          "Must be a valid email or 10-digit Turkish phone number",
          "يجب أن يكون بريدًا إلكترونيًا صالحًا أو رقم هاتف تركي مكون من 10 أرقام",
          "Geçerli bir e-posta veya 10 haneli Türk telefon numarası olmalı"
        ),
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
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
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
