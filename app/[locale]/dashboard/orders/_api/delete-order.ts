import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getAllOrdersQueryOptions } from "./get-all-orders";
import { deleteOrderAction } from "@/server-actions/delete/delete-order-action";

export const deleteOrder = async ({ OrderId }: { OrderId: string }) => {
  return deleteOrderAction(OrderId);
};

type UseDeleteOrderOptions = {
  mutationConfig?: MutationConfig<typeof deleteOrder>;
};

export const useDeleteOrder = ({
  mutationConfig,
}: UseDeleteOrderOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllOrdersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteOrder,
  });
};
