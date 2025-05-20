"use server";

import prisma from "@/lib/db";
import { SignUpSchemeInput } from "../_utils/auth-schemes";
import { hash } from "bcrypt";

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

    const userName = await prisma.user.findFirst({
      where: {
        username: value.username,
      },
    });

    if (userName) {
      return {
        error: "Username already exists",
        code: "username_exists",
        success: false,
        email: "",
        password: "",
      };
    }

    const hashedPassword = await hash(value.password, 10); // 10 is the salt rounds

    const user = await prisma.user.create({
      data: {
        email: value.email,
        username: value.username,
        password: hashedPassword,
        name: value.name,
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
