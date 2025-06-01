"use server";

import prisma from "@/lib/db";

const GetAllOrderDataAction = async () => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                name_ar: true,
                name_tr: true,
              },
            },
          },
        },
      },
    });

    return orders.map((order) => ({
      userId: order.userId,
      orderId: order.id,
      userAddress: order.user.address,
      userName: order.user.name,
      userEmail: order.user.email,
      userPhone: order.user.phone,
      totalPrice: order.total,
      status: order.status,
      randomId: order.randomId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderItems: order.orderItems.map((item) => ({
        quantity: item.quantity,
        product: {
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          name_ar: item.product.name_ar,
          name_tr: item.product.name_tr,
        },
      })),
    }));
  } catch (error) {
    console.error("Error in GetAllOrderData:", error);
    throw new Error("Failed to fetch order data");
  }
};

export default GetAllOrderDataAction;

export type GetAllOrdersResponseType = Awaited<
  ReturnType<typeof GetAllOrderDataAction>
>[number];
// export type GetAllOrdersResponseType = Awaited<ReturnType<typeof GetAllOrderDataAction>>; all
