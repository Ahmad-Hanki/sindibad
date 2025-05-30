"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

const getOrderData = async (userId: string) => {
  try {
    const res = await prisma.order.findFirst({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw new Error("Failed to fetch order data");
  }
};

export default getOrderData;

export type OrderItemWithProductType = Prisma.OrderItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type OrderDataType = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
  };
}>;
