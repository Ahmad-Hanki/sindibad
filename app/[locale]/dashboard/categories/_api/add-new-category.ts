import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { addNewCategoryAction } from "@/server-actions/post/add-new-category-action";
import { Category } from "@prisma/client";
import { getAllCategoryQueryOptions } from "../../_api/get-all-categories";
import { FormCategorySchemaInput } from "../_utils/formCategory-schemes";
export const createCategory = async ({
  data,
}: {
  data: FormCategorySchemaInput;
}): Promise<Category> => {
  return await addNewCategoryAction(data);
};

type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({
  mutationConfig,
}: UseCreateCategoryOptions = {}) => {
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
    mutationFn: createCategory,
  });
};
