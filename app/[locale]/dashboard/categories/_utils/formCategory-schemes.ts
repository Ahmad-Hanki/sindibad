import { z } from "zod";

export const getCategoryFormSchema = (locale: string) => {
  return z.object({
    name: z.string().min(1, {
      message: locale === "en" ? "English Name is required" : locale == 'tr' ? 'İngilizce Adı zorunludur' : "الاسم الانجليزي مطلوب",
    }),
    name_ar: z.string().min(1, {
      message: locale === "en" ? "Arabic Name is required" : locale == 'tr' ? 'Arapça Adı zorunludur' : "الاسم العربي مطلوب",
    }),

    name_tr: z.string().min(1, {
      message: locale === "en" ? "Turkish Name is required" : locale == 'tr' ? 'Türkçe Adı zorunludur' : "الاسم التركي مطلوب",
    }),

   
  });
};

export type FormCategorySchemaInput = z.infer<
  ReturnType<typeof getCategoryFormSchema>
>;
