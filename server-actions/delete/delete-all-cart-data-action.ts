"use server";
import prisma from "@/lib/db";

export const deleteAllCartDataAction = async (cartId: string) => {
  const cartItem = await prisma.cartItem.deleteMany({
    where: {
      cartId: cartId,
    },
  });

  return cartItem;
};
