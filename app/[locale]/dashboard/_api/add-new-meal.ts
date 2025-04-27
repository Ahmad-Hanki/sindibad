import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import {
  addNewMealAction,
  MealType,
} from "@/app/_actions/post/add-new-meal-action";
import { Product } from "@prisma/client";

export const createMeal = async ({
  data,
}: {
  data: MealType;
}): Promise<Product  > => {
  return await addNewMealAction(data);
};

type UseCreateMealOptions = {
  mutationConfig?: MutationConfig<typeof createMeal>;
};

export const useCreateMeal = ({
  mutationConfig,
}: UseCreateMealOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
    //   queryClient.invalidateQueries({
    //     queryKey: getMealsQueryOptions().queryKey,
    //   });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createMeal,
  });
};
