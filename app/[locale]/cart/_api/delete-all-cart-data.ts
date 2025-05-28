import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getAllCartDataQueryOptions } from "./get-cart-data";
import { deleteAllCartDataAction } from "@/server-actions/delete/delete-all-cart-data-action";

export const deleteAllCartData = async ({ id }: { id: string }) => {
  return await deleteAllCartDataAction(id);
};

type UseDeleteAllCartDataOptions = {
  mutationConfig?: MutationConfig<typeof deleteAllCartData>;
  userId: string;
};

export const useDeleteAllCartData = ({
  mutationConfig,
  userId,
}: UseDeleteAllCartDataOptions) => {
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
    mutationFn: deleteAllCartData,
  });
};
