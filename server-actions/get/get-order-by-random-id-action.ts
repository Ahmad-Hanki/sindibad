"use server";

import prisma from "@/lib/db";

const GetOrderByRandomIdAction = (randId: string) => {
  try {
    const order = prisma.order.findFirst({
      where: {
        randomId: randId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            address: true,
            phone: true,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.error("Error fetching order by random ID:", error);
    throw new Error("Failed to fetch order");
  }
};

export default GetOrderByRandomIdAction;

export type GetOrderByRandomIdActionType = typeof GetOrderByRandomIdAction;

