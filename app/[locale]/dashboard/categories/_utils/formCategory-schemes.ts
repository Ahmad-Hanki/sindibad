import { z } from "zod";

export const getCategoryFormSchema = (locale: string) => {
  return z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    name_ar: z.string().min(1, {
      message: "الاسم مطلوب",
    }),

    name_tr: z.string().min(1, {
      message: "Adi zorunludur",
    }),

    slug: z.string().min(1, {
      message:
        locale == "en"
          ? "slug is required"
          : locale == "ar"
          ? "العيار مطلوب"
          : "Slug yazılmalıdır",
    }),
  });
};

export type FormCategorySchemaInput = z.infer<
  ReturnType<typeof getCategoryFormSchema>
>;
