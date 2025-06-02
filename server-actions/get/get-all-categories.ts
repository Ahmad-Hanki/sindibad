"use server";

import prisma from "@/lib/db";

export const getAllCategoryAction = async () => {
  try {
    const res = await prisma.category.findMany();
    return res;
  } catch (error) {
    console.error("Error fetching most popular products:", error);
  }
};

export type GetAllCategoriesResponseType = NonNullable<
  Awaited<ReturnType<typeof getAllCategoryAction>>
>[number];
