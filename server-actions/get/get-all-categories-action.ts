"use server";

import prisma from "@/lib/db";

export const getAllCategoriesAction = async () => {
  try {
    const res = await prisma.category.findMany({});
    return res;
  } catch (error) {
    console.error("Error fetching all categories:", error);
  }
};
