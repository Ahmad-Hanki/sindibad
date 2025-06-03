"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { FormUserSchemaInput } from "@/app/[locale]/cart/_utils/form-schemes";

export const updateAddressToUser = async (
  formData: FormUserSchemaInput,
  userId: string
): Promise<User> => {
  try {
    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address: formData.address,
      },
    });
    return res;
  } catch (error) {
    console.error("Error updating address:", error);
    throw new Error("Failed to update address"); // Throw instead of returning undefined
  }
};
