"use server";

import axios from "axios";
import { cookies, headers } from "next/headers";
import * as crypto from "crypto";
import { CreateOrderAction } from "../post/create-order-action";
import { CartDataType } from "../get/get-cart-data-action";

export type PaytrDataType = {
  data: {
    merchant_id?: string;
    user_ip?: string;

    merchant_oid?: string; // order Id
    email: string;
    payment_amount: number;
    currency?: "TL" | "EUR" | "USD" | "GBP" | "RUB";
    user_basket: {
      name: string; // product name
      price: number; // product price
      quantity: number; // product quantity
    }[];
    no_installment?: number; // taksit? 1 means no
    max_installment?: number; // max taksit
    paytr_token?: string;
    user_name: string;
    user_address: string;
    user_phone: string;
    merchant_ok_url?: string;
    merchant_fail_url?: string;
    lang?: "tr" | "en";

    test_mode?: "0" | "1"; // 1 for test mode, 0 for live mode (defaults to 0)
    debug_on?: number; // 1 to display errors for debugging purposes
    timeout_limit?: number;
  };
  // Time limit for payment completion in minutes (defaults to 30 if not sent)
};

const CreatePaytrToken = async (
  cartData: CartDataType,
  { data }: PaytrDataType
) => {
  const res = await CreateOrderAction(cartData, data.payment_amount);

  if (!res) {
    return false;
  }

  const header = await headers();
  data.user_ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  data.merchant_id = process.env.PAYTR_MERCHANT_ID;

  data.currency = "TL";
  data.no_installment = 1;

  data.max_installment = 0;

  data.test_mode = "1";
  data.timeout_limit = 3; // mins

  data.merchant_oid = res;
  data.merchant_ok_url = `${process.env.BASE_URL}/my-orders`;
  data.merchant_fail_url = `${process.env.BASE_URL}/fail`;

  data.payment_amount = data.payment_amount * 100;

  const hashStr = [
    data.merchant_id,
    data.user_ip,
    data.merchant_oid,
    data.email,
    data.payment_amount,
    data.user_basket,
    data.no_installment,
    data.max_installment,
    data.currency,
    data.test_mode,
  ].join("");
  const paytrToken = crypto
    .createHmac("sha256", process.env.PAYTR_MERCHANT_KEY!) // Use the merchant key for hashing
    .update(hashStr + process.env.PAYTR_MERCHANT_SALT!) // Append merchant salt
    .digest("base64");

  data.paytr_token = paytrToken;
  console.log("PayTR Token Data:", data);
  try {
    // Send the request to PayTR API
    const response = await axios.post(
      "https://www.paytr.com/odeme/api/get-token",
      {
        ...data,
        user_basket: JSON.stringify(data.user_basket),
      },

      { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // Set content type for form submission
    );

    const cookie = await cookies();

    if (response.data.status === "success") {
      // empty it in the success callback
      // in the callbackurl

      cookie.set({
        name: "paytrToken",
        value: response.data.token,
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 2 * 60 * 1000), // Expires in 2 minutes
      });
    }
    return response.data;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error generating token:", error);
    }
  }
};

export default CreatePaytrToken;
