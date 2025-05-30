import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const getUserFormSchema = (locale: string) => {
  return z.object({
    name: z.string().min(1, {
      message:
        locale == "en"
          ? "Name is required"
          : locale == "ar"
          ? "الاسم مطلوب"
          : "Ad zorunludur",
    }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

    email: z.string().email({
      message:
        locale == "en"
          ? "Invalid email address"
          : locale == "ar"
          ? "عنوان البريد الإلكتروني غير صالح"
          : "Geçersiz e-posta adresi",
    }),

    address: z.string().min(10, {
      message:
        locale == "en"
          ? "Address is required"
          : locale == "ar"
          ? "العنوان مطلوب"
          : "Adres zorunludur",
    }),
  });
};

export type UserFormSchemaInput = z.infer<ReturnType<typeof getUserFormSchema>>;
