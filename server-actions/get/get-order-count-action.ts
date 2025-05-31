"use server";

import prisma from "@/lib/db";

const getOrdersCountAction = (id: string) => {
  try {
    const cartCount = prisma.order.count({
      where: {
        userId: id,
      },
    });
    return cartCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default getOrdersCountAction;
