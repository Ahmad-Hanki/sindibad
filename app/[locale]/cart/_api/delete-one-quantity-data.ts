import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { deleteOneQuantityAction } from "@/server-actions/put/delete-one-quantity-action";
import { getAllCartDataQueryOptions } from "./get-cart-data";

export const deleteOneQuantity = async ({ id }: { id: string }) => {
  return await deleteOneQuantityAction(id);
};

type UseDeleteOneQuantityOptions = {
  mutationConfig?: MutationConfig<typeof deleteOneQuantity>;
  userId: string;
};

export const useDeleteOneQuantity = ({
  mutationConfig,
  userId,
}: UseDeleteOneQuantityOptions) => {
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
    mutationFn: deleteOneQuantity,
  });
};
