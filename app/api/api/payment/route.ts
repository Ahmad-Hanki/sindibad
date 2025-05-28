import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";
import { deleteAllCartDataAction } from "@/server-actions/delete/delete-all-cart-data-action";

const merchant_key = process.env.PAYTR_MERCHANT_KEY;
const merchant_salt = process.env.PAYTR_MERCHANT_SALT;

export const POST = async (req: Request) => {
  try {
    // Parse the form data
    const formData = await req.text();
    const callback = Object.fromEntries(new URLSearchParams(formData));

    // Generate hash
    const paytr_token =
      callback.merchant_oid +
      merchant_salt +
      callback.status +
      callback.total_amount;
    const token = crypto
      .createHmac("sha256", merchant_key!)
      .update(paytr_token)
      .digest("base64");

    // Validate the hash
    if (token !== callback.hash) {
      throw new Error("PAYTR notification failed: bad hash");
    }

    if (callback.status === "success") {
      const order = await prisma.order.update({
        where: { id: callback.merchant_oid },
        data: { status: "CONFIRMED" },
        include: { user: { include: { cart: true } } },
      });

      if (order?.user?.cart) {
        // Delete all ?.cart items associated with the user's cart
        await deleteAllCartDataAction(order?.user?.cart.id);
      }
    } else {
      await prisma.order.delete({
        where: { id: callback.merchant_oid },
      });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
