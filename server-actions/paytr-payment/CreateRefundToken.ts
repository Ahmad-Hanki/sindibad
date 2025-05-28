"use server";
import { cookies, headers } from "next/headers";
import * as crypto from "crypto";
import axios from "axios";

export type RefundRequestData = {
  data: {
    merchant_id?: string;
    user_ip?: string; // User IP
    paytr_token?: string; // PayTR refund token
    merchant_oid: string; // Order ID
    return_amount: number; // Refund amount
    email: string; // User email
    user_name: string; // User name
    user_address: string; // User address
    user_phone: string; // User phone
    test_mode?: "0" | "1"; // Test or live mode
    lang?: "tr" | "en"; // Language preference
  };
};

// Refund token creation function
const CreateRefundToken = async ({ data }: RefundRequestData) => {
  const header = await headers();

  data.merchant_id = process.env.PAYTR_MERCHANT_ID;
  // Get user IP
  data.user_ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  // Generate the refund token
  const hashStr = [
    data.merchant_id,
    data.user_ip,
    data.merchant_oid,
    data.email,
    data.return_amount,
    data.user_name,
    data.user_address,
    data.user_phone,
    data.test_mode ?? "1",
  ].join("");

  const refundToken = crypto
    .createHmac("sha256", process.env.PAYTR_MERCHANT_KEY!) // Use the merchant key for hashing
    .update(hashStr + process.env.PAYTR_MERCHANT_SALT!) // Append merchant salt
    .digest("base64");

  // Attach token to the data object
  data.paytr_token = refundToken;

  try {
    // Send the request to PayTR's refund API
    const response = await axios.post(
      "https://www.paytr.com/odeme/iade", // PayTR refund API endpoint
      data,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } } 
      // Set content type for form submission
    );

    // Set a cookie with the PayTR refund token
    const cookie = await cookies();

    if (response.data.status === "success") {
      cookie.set({
        name: "paytrRefundToken",
        value: response.data.token,
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 3 * 60 * 1000), // Expires in 3 minutes
      });

      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error generating refund token:", error);
    }
    return { status: "failure", error: "Error generating refund token" };
  }
};

export default CreateRefundToken;
