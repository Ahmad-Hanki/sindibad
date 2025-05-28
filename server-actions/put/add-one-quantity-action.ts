"use server";
import prisma from "@/lib/db";

export const addOneQuantityAction = async (mealItemId: string) => {
  const cartItem = await prisma.cartItem.update({
    where: {
      id: mealItemId,
    },
    data: {
      quantity: { increment: 1 },
    },
  });

  return cartItem;
};
