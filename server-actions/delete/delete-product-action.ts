"use server";

import prisma from "@/lib/db";
import { Product } from "@prisma/client";

export const deleteMealAction = async (id: string): Promise<Product> => {
  try {
    const res = await prisma.product.delete({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    console.error("Error deleting a meal:", error);
    throw new Error("Failed to create meal"); // Throw instead of returning undefined
  }
};
