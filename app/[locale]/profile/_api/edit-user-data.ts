import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { authUserQueryOptions } from "@/server-actions/auth/get-user";
import { UserFormSchemaInput } from "../_utils/user-scheme";
import EditUserDataAction from "@/server-actions/put/edit-user-data-action";

export const updateUserData = async ({
  data,
  id,
}: {
  data: UserFormSchemaInput;
  id: string;
}) => {
  const result = await EditUserDataAction(data, id);

  if (!result.success) {
    // Throw a custom error so `onError` can catch it
    throw new Error(result.error || "Failed to update user data");
  }

  return result;
};

type UseUpdateUserDataOptions = {
  mutationConfig?: MutationConfig<typeof updateUserData>;
};

export const useUpdateUserData = ({
  mutationConfig,
}: UseUpdateUserDataOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: authUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateUserData,
  });
};
