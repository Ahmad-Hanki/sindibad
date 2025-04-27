"use server";

import prisma from "@/lib/db";
import { Product } from "@prisma/client";

export interface MealType {
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: string;
  mostPopular: boolean;
}
// app/_actions/post/add-new-meal-action.ts
export const addNewMealAction = async (
  formData: MealType
): Promise<Product> => {
  try {
    const res = await prisma.product.create({
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
