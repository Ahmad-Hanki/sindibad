import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getAllCartDataQueryOptions } from "./get-cart-data";
import { CartDataType } from "@/server-actions/get/get-cart-data-action";
import CreatePaytrToken from "@/server-actions/paytr-payment/CreatePaytrToken";

export const orderWithCreditCard = async ({
  cartData,
  email,
  price,
  userName,
  userAddress,
  userPhone,
  shipping_fee,
  randomId,
}: {
  cartData: CartDataType;
  email: string;
  price: number;
  userName: string;
  userPhone: string;
  userAddress: string;
  shipping_fee?: number;
  randomId: string;
}) => {
  const basketData = cartData.cartItems.map((item) => ({
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));
  try {
    const res = await CreatePaytrToken(
      cartData,
      {
        data: {
          email: email,
          payment_amount: price,
          user_basket: basketData,
          user_name: userName,
          user_address: userAddress,
          user_phone: userPhone,
          shipping_fee,
        },
      },
      randomId
    );

    if (res.status == "success") {
      return res;
    } else if (res.status == "failed") {
      throw new Error(res.reason);
    }
  } catch (error) {
    throw new Error((error as string) ?? "Payment failed");
  }
};

type UseOrderWithCreditCardOptions = {
  mutationConfig?: MutationConfig<typeof orderWithCreditCard>;
  userId: string;
};

export const useOrderWithCreditCard = ({
  mutationConfig,
  userId,
}: UseOrderWithCreditCardOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllCartDataQueryOptions(userId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: orderWithCreditCard,
  });
};
