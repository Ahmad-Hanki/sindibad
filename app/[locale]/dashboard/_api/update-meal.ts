import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import {
  addNewMealAction,
  MealType,
} from "@/app/_actions/post/add-new-meal-action";
import { Product } from "@prisma/client";
import { updateMealAction } from "@/app/_actions/put/update-product-action";
import { getAllProductsQueryOptions } from "./get-all-products";

export const updateMeal = async ({
  data,
  id,
}: {
  data: MealType;
  id: string;
}): Promise<Product> => {
  return await updateMealAction(data, id);
};

type UseUpdateMealOptions = {
  mutationConfig?: MutationConfig<typeof updateMeal>;
};

export const useUpdateMeal = ({
  mutationConfig,
}: UseUpdateMealOptions = {}) => {
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
    mutationFn: updateMeal,
  });
};
