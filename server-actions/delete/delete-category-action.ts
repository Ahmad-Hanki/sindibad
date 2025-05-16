"use server";

import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export const deleteCategoryAction = async (id: string): Promise<Category> => {
  try {
    const res = await prisma.category.delete({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    console.error("Error deleting a category:", error);
    throw new Error("Failed to create category"); // Throw instead of returning undefined
  }
};
