"use server";
import prisma from "@/lib/db";

export const deleteOneQuantityAction = async (mealItemId: string) => {
  const cartItem = await prisma.cartItem.update({
    where: {
      id: mealItemId,
    },
    data: {
      quantity: { decrement: 1 },
    },
  });

  return cartItem;
};
