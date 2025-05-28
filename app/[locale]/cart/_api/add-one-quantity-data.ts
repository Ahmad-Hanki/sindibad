import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { addOneQuantityAction } from "@/server-actions/put/add-one-quantity-action";
import { getAllCartDataQueryOptions } from "./get-cart-data";

export const addOneQuantity = async ({ id }: { id: string }) => {
  return await addOneQuantityAction(id);
};

type UseAddOneQuantityOptions = {
  mutationConfig?: MutationConfig<typeof addOneQuantity>;
  userId: string;
};

export const useAddOneQuantity = ({
  mutationConfig,
  userId,
}: UseAddOneQuantityOptions) => {
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
    mutationFn: addOneQuantity,
  });
};
