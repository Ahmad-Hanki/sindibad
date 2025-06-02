"use server";

import { FormCategorySchemaInput } from "@/app/[locale]/dashboard/categories/_utils/formCategory-schemes";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export const updateCategoryAction = async (
  formData: FormCategorySchemaInput,
  id: string
): Promise<Category> => {
  const slug = formData.name.replace(/\s+/g, "-").toLowerCase();
  try {
    const res = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: formData.name,
        name_ar: formData.name_ar,
        name_tr: formData.name_tr,
      },
    });
    return res;
  } catch (error) {
    console.error("Error adding new category:", error);
    throw new Error("Failed to create category"); // Throw instead of returning undefined
  }
};
