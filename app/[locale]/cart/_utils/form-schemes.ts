import { z } from "zod";

export const getUserFormSchema = (locale: string) => {
  return z.object({
    address: z.string().min(10, {
      message:
        locale === "en"
          ? "Address is required"
          : locale == "tr"
          ? "Adres zorunludur"
          : "العنوان مطلوب",
    }),
  });
};

export type FormUserSchemaInput = z.infer<ReturnType<typeof getUserFormSchema>>;
