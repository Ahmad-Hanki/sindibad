"use server";

import prisma from "@/lib/db";
import { Orders } from "@prisma/client";

export const deleteOrderAction = async (id: string): Promise<Orders> => {
  try {
    const res = await prisma.orders.delete({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    console.error("Error deleting an order:", error);
    throw new Error("Failed to delete order"); // Throw instead of returning undefined
  }
};
