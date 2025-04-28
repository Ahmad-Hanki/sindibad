"use server";

import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { MealType } from "../post/add-new-meal-action";


export const updateMealAction = async (
  formData: MealType,
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
