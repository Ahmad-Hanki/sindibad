"use server";

import { FormSchemaInput } from "@/app/[locale]/dashboard/_utils/form-schemes";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";

export const updateMealAction = async (
  formData: FormSchemaInput,
  id: string
): Promise<Product> => {
  try {
    const res = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: formData.name,
        description: formData.description,
        name_ar: formData.name_ar,
        name_tr: formData.name_tr,
        description_ar: formData.description_ar,
        description_tr: formData.description_tr,
        image: formData.image,
        price: formData.price,
        categoryId: formData.categoryId,
        mostPopular: formData.mostPopular,
      },
    });
    return res;
  } catch (error) {
    console.error("Error adding new meal:", error);
    throw new Error("Failed to create meal"); // Throw instead of returning undefined
  }
};
