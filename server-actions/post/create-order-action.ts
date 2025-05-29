"use server";
import prisma from "@/lib/db";
import { CartDataType } from "../get/get-cart-data-action";
import { PaymentMethod } from "@prisma/client";

export const CreateOrderAction = async (
  cartData: CartDataType,
  price: number,
  paymentMethod: PaymentMethod,
  shippingFee: number = 0,
  randomId: string,
  orderImage?: string
) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: cartData.userId,
        total: price + shippingFee, 
        orderItems: {
          create: cartData.cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        },
        discount: 0, // Assuming no discount for now, adjust as needed

        paymentMethod: paymentMethod, // Assuming payment method is Credit Card, adjust as needed
        status: "PENDING", // Assuming initial status is PENDING, adjust as needed

        shippingFee, // Assuming no shipping fee for now, adjust as needed
        freeShipping: shippingFee == 0 ? true : false, // change this to your actual order items structure
        orderImage,
        randomId,
      },
    });

    return order.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};
