"use server";

import prisma from "@/lib/db";

export const getAllProductsAction = async () => {
  try {
    const res = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formatted = res.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      mostPopular: product.mostPopular,
      categoryName: product.category.name,
      categoryId: product.category.id,
    }));
    return formatted;
  } catch (error) {
    console.error("Error fetching most popular products:", error);
  }
};
