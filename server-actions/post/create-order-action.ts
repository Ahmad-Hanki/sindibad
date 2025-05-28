"use server";
import prisma from "@/lib/db";
import { CartDataType } from "../get/get-cart-data-action";

export const CreateOrderAction = async (
  cartData: CartDataType,
  price: number
) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: cartData.userId,
        total: price,
        orderItems: {
          create: cartData.cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        },
        discount: 0, // Assuming no discount for now, adjust as needed

        paymentMethod: "CREDIT_CARD", // Assuming payment method is Credit Card, adjust as needed
        status: "PENDING", // Assuming initial status is PENDING, adjust as needed

        shippingFee: 0, // Assuming no shipping fee for now, adjust as needed
        freeShipping: true, // change this to your actual order items structure
      },
    });

    return order.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};
