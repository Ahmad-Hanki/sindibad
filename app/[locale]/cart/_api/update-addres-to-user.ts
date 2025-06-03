import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { updateAddressToUser as updateAddressToUserApi } from "@/server-actions/auth/update-user-addres";
import { getAllCartDataQueryOptions } from "./get-cart-data";
import { FormUserSchemaInput } from "../_utils/form-schemes";

export const updateAddressToUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: FormUserSchemaInput;
}) => {
  return await updateAddressToUserApi(data, userId);
};

type UseUpdateAddressToUserOptions = {
  mutationConfig?: MutationConfig<typeof updateAddressToUser>;
  userId: string;
};

export const useUpdateAddressToUser = ({
  mutationConfig,
  userId,
}: UseUpdateAddressToUserOptions) => {
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
    mutationFn: updateAddressToUser,
  });
};
