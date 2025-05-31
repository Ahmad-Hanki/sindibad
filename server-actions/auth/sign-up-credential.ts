"use server";

import prisma from "@/lib/db";
import { SignUpSchemeInput } from "../../app/[locale]/(auth)/_utils/auth-schemes";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";

const SignUpWithCredential = async ({
  value,
}: {
  value: SignUpSchemeInput;
}) => {
  try {
    const hashedPassword = await hash(value.password, 10); // 10 is the salt rounds

    const user = await prisma.user.create({
      data: {
        email: value.email,
        phone: value.phone,
        password: hashedPassword,
        name: value.name,
        cart: {
          create: {},
        },
      },
    });

    return {
      user,
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint failed
      if (error.code === "P2002") {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes("email")) {
          return {
            error: "Email already exists",
            code: "email_exists",
            success: false,

          };
        }
        if (target.includes("phone")) {
          return {
            error: "Phone exists",
            code: "phone_exists",
            success: false,

          };
        }
      }
    }

    return { success: false, error: "Failed to sign up." };
  }
};

export default SignUpWithCredential;
