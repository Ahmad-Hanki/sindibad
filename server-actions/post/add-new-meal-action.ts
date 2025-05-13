"use server";

import { FormSchemaInput } from "@/app/[locale]/dashboard/_utils/form-schemes";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";

// app/_actions/post/add-new-meal-action.ts
export const addNewMealAction = async (
  formData: FormSchemaInput
): Promise<Product> => {

  try {
    const slug = formData.name
      .replace(/\s+/g, "-") 
      .toLowerCase(); 
    const res = await prisma.product.create({
      data: {
        name: formData.name,
        slug,
        description: formData.description,
        description_ar: formData.description_ar,
        description_tr: formData.description_tr,
        image: formData.image,
        price: formData.price,
        categoryId: formData.categoryId,
        mostPopular: formData.mostPopular,
        name_ar: formData.name_ar,
        name_tr: formData.name_tr,
      },
    });
    return res;
  } catch (error) {
    console.error("Error adding new meal:", error);
    throw new Error("Failed to create meal"); // Throw instead of returning undefined
  }
};
