"use server";

import { UserFormSchemaInput } from "@/app/[locale]/profile/_utils/user-scheme";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

const EditUserDataAction = async (
  newData: UserFormSchemaInput,
  userId: string
) => {
  try {
   await prisma.user.update({
      where: { id: userId },
      data: {
        name: newData.name,
        phone: newData.phone.startsWith("+90")
          ? newData.phone.slice(3)
          : newData.phone,
        email: newData.email,
        address: newData.address,
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint failed
      if (error.code === "P2002") {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes("email")) {
          return { success: false, error: "This email is already in use." };
        }
        if (target.includes("phone")) {
          return {
            success: false,
            error: "This phone number is already in use.",
          };
        }
      }
    }

    console.error("Unexpected error updating user data:", error);
    return { success: false, error: "Failed to update user data." };
  }
};

export default EditUserDataAction;
