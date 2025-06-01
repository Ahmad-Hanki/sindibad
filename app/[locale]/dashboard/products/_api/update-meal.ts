import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { Product } from "@prisma/client";
import { updateMealAction } from "@/server-actions/put/update-product-action";
import { getAllProductsQueryOptions } from "./get-all-products";
import { FormSchemaInput } from "../_utils/form-schemes";

export const updateMeal = async ({
  data,
  id,
}: {
  data: FormSchemaInput;
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
