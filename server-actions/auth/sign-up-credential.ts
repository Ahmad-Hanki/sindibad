"use server";

import prisma from "@/lib/db";
import { SignUpSchemeInput } from "../../app/[locale]/(auth)/_utils/auth-schemes";
import { hash } from "bcryptjs";

const SignUpWithCredential = async ({
  value,
}: {
  value: SignUpSchemeInput;
}) => {
  try {
    const email = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });
    if (email) {
      return {
        error: "Email already exists",
        code: "email_exists",
        success: false,
        email: "",
        password: "",
      };
    }

    const phone = await prisma.user.findFirst({
      where: {
        phone: value.phone,
      },
    });

    if (phone) {
      return {
        error: "Phone exists",
        code: "phone_exists",
        success: false,
        email: "",
        password: "",
      };
    }

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
    console.error("Error signing up with credentials:", error);
    return {
      error: "An error occurred while signing in",
      success: false,
      code: "unknown_error",
      email: "",
      password: "",
    };
  }
};

export default SignUpWithCredential;
