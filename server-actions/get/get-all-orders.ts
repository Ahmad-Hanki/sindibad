"use server";

import prisma from "@/lib/db";
import { custom } from "zod";

export const getAllOrdersAction = async () => {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                name_ar: true,
                name_tr: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      note: order.note,
      totalAmount: order.totalAmount,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerLocation: order.customerLocation,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.orderItems.map((item) => ({
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          name_ar: item.product.name_ar,
          name_tr: item.product.name_tr,
          price: item.product.price,
          image: item.product.image,
        },
      })),
    }));

    return formatted;
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return [];
  }
};

export type GetAllOrdersResponseType = NonNullable<
  Awaited<ReturnType<typeof getAllOrdersAction>>
>[number];
