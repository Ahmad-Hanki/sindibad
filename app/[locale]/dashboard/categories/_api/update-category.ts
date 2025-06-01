import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { Category } from "@prisma/client";
import { updateCategoryAction } from "@/server-actions/put/update-category-action";
import { getAllCategoryQueryOptions } from "../../_api/get-all-categories";
import { FormCategorySchemaInput } from "../../_utils/formCategory-schemes";

export const updateCategory = async ({
  data,
  id,
}: {
  data: FormCategorySchemaInput;
  id: string;
}): Promise<Category> => {
  return await updateCategoryAction(data, id);
};

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({
  mutationConfig,
}: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllCategoryQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateCategory,
  });
};
