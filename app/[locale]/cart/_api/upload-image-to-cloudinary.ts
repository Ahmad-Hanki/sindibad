import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { RefObject } from "react";
import { CreateOrderImageRef } from "../_components/create-order-image";
import { UploadImageToCloudinaryAction } from "@/server-actions/cloudinary/upload-order-image-to-cloudinary-action";
import { CartDataType } from "@/server-actions/get/get-cart-data-action";
import { getAllCartDataQueryOptions } from "./get-cart-data";

export const uploadImageToCloudinary = async ({
  imageRef,
  cartData,
  price,
  randomId,
  shipping_fee = 0,
}: {
  imageRef: RefObject<CreateOrderImageRef>;
  cartData: CartDataType;
  price: number;
  randomId: string;
  shipping_fee?: number;
}) => {
  const base64Image = await imageRef.current?.generateImage();
  if (!base64Image) {
    throw new Error("No image to upload");
  }

  return await UploadImageToCloudinaryAction({
    image: base64Image,
    cartData,
    price,
    randomId,
    shipping_fee,
  });
};

type UseUploadImageToCloudinaryOptions = {
  mutationConfig?: MutationConfig<typeof uploadImageToCloudinary>;
  userId: string;
};

export const useUploadImageToCloudinary = ({
  mutationConfig,
  userId,
}: UseUploadImageToCloudinaryOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllCartDataQueryOptions(userId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: uploadImageToCloudinary,
  });
};
