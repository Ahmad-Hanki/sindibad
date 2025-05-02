import { z } from "zod";

export const getProductFormSchema = (locale: string) => {
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

    description: z.string().min(1, {
      message: "Description is required",
    }),

    description_ar: z.string().min(1, {
      message: "الوصف مطلوب",
    }),

    descrıptıon_tr: z.string().min(1, {
      message: "Açıklama zorunludur",
    }),
    price: z.number().min(1, {
      message:
        locale == "en"
          ? "Price is required"
          : locale == "ar"
          ? "السعر مطلوب"
          : "Fiyat zorunludur",
    }),

    image: z.string().min(1, {
      message:
        locale == "en"
          ? "Image is required"
          : locale == "ar"
          ? "الصورة مطلوبة"
          : "Resim zorunludur",
    }),

    categoryId: z.string().min(1, {
      message:
        locale == "en"
          ? "Category is required"
          : locale == "ar"
          ? "الفئة مطلوبة"
          : "Kategori zorunludur",
    }),
    mostPopular: z.boolean().optional(),
  });
};

export type FormSchemaInput = z.infer<ReturnType<typeof getProductFormSchema>>;
