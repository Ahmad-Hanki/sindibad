"use server";
import prisma from "@/lib/db";

export const addMealToTheCart = async (userId: string, mealId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found for this user");
  }

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: mealId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      cartId: cart.id,
      productId: mealId,
      quantity: 1,
    },
  });

  return cartItem;
};
