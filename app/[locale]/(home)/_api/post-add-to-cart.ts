import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { getCartCountQueryOptions } from "@/components/navbar/_api/get-product-count";
import { addMealToTheCart } from "@/server-actions/post/add-meal-to-the-cart";

export const addItemToCart = async ({
  productId,
  userId,
}: {
  userId: string;
  productId: string;
}) => {
  return await addMealToTheCart(userId, productId);
};

type UseAddItemToCartOptions = {
  mutationConfig?: MutationConfig<typeof addItemToCart>;
  userId: string;
};

export const useAddItemToCart = ({
  mutationConfig,
  userId,
}: UseAddItemToCartOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCartCountQueryOptions({ userId }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addItemToCart,
  });
};
