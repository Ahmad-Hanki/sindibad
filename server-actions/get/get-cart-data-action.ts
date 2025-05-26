"use server";

import prisma from "@/lib/db";

const getCartData = async (userId: string) => {
  try {
    const res = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw new Error("Failed to fetch cart data");
  }
};

export default getCartData;
