"use server";

import prisma from "@/lib/db";

const getProductCountAction = (id: string) => {
  try {
    const cartCount = prisma.cartItem.count({
      where: {
        cart: {
          userId: id,
        },
      },
    });
    return cartCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default getProductCountAction;
