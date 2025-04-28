import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getAllProductsQueryOptions } from "./get-all-products";
import { deleteMealAction } from "@/app/_actions/delete/delete-product-action";

export const deleteMeal = async ({
  MealId,
}: {
  MealId: string;
}) => {
  return deleteMealAction(MealId);
};

type UseDeleteMealOptions = {
  mutationConfig?: MutationConfig<typeof deleteMeal>;
};

export const useDeleteMeal = ({
  mutationConfig,
}: UseDeleteMealOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteMeal,
  });
};
