"use server";
import { v2 as cloudinary } from "cloudinary";

import { CartDataType } from "../get/get-cart-data-action";
import { CreateOrderAction } from "../post/create-order-action";
import { deleteAllCartDataAction } from "../delete/delete-all-cart-data-action";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadImageToCloudinaryAction = async ({
  image,
  cartData,
  price,
  randomId,
  shipping_fee,
}: {
  image: string;
  cartData: CartDataType;
  price: number;
  randomId: string;
  shipping_fee?: number;
}) => {
  try {
    if (!image) throw new Error("No image to upload");

    // Remove the data:image/png;base64, prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:image/png;base64,${base64Data}`,
        {
          folder: "order-receipts",
          upload_preset: "sindibad", // Your upload preset
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if (result) {
      await CreateOrderAction(
        cartData,
        price,
        "CASH_ON_DELIVERY",
        shipping_fee,
        randomId,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result.secure_url // Use the secure URL from Cloudinary
      );

      await deleteAllCartDataAction(cartData.id);
    }

    return result; // Contains secure_url, public_id, etc.
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};
