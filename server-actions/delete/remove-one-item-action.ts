"use server";
import prisma from "@/lib/db";

export const removeOneItemAction = async (mealItemId: string) => {
  const cartItem = await prisma.cartItem.delete({
    where: {
      id: mealItemId,
    },
  });

  return cartItem;
};
