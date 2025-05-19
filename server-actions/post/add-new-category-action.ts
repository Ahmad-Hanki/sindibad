"use server";

import { FormCategorySchemaInput } from "@/app/[locale]/dashboard/_utils/formCategory-schemes";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";

// app/_actions/post/add-new-meal-action.ts
export const addNewCategoryAction = async (
  formData: FormCategorySchemaInput
): Promise<Category> => {
  try {
    const slug = formData.name
      .replace(/\s+/g, "-") 
      .toLowerCase(); 
    const res = await prisma.category.create({
      data: {
        name: formData.name,
        name_ar: formData.name_ar,
        name_tr: formData.name_tr,
        slug: slug,
      },
    });
    return res;
  } catch (error) {
    console.error("Error adding new category:", error);
    throw new Error("Failed to create category"); // Throw instead of returning undefined
  }
};
