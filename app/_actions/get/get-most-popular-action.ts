"use server";

import prisma from "@/lib/db";

export const getMostPopularAction = async () => {
  try {
    const res = await prisma.product.findMany({
      where: {
        mostPopular: true,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching most popular products:", error);
  }
};
