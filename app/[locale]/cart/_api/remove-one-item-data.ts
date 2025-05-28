import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getAllCartDataQueryOptions } from "./get-cart-data";
import { removeOneItemAction } from "@/server-actions/delete/remove-one-item-action";

export const removeOneItem= async ({ id }: { id: string }) => {
  return await removeOneItemAction(id);
};

type UseRemoveOneItemOptions = {
  mutationConfig?: MutationConfig<typeof removeOneItem>;
  userId: string;
};

export const useRemoveOneItem = ({
  mutationConfig,
  userId,
}: UseRemoveOneItemOptions) => {
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
    mutationFn: removeOneItem,
  });
};
