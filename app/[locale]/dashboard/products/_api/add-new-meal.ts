import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { addNewMealAction } from "@/server-actions/post/add-new-meal-action";
import { Product } from "@prisma/client";

import { FormSchemaInput } from "../../_utils/form-schemes";
import { getAllProductsQueryOptions } from "./get-all-products";
export const createMeal = async ({
  data,
}: {
  data: FormSchemaInput;
}): Promise<Product> => {
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
      queryClient.invalidateQueries({
        queryKey: getAllProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createMeal,
  });
};
