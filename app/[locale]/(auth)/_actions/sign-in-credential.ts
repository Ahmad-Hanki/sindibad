"use server";
import prisma from "@/lib/db";
import { SignInSchemeInput } from "../_utils/auth-schemes";
import { compare } from "bcryptjs";

const SignInWithCredential = async ({
  value,
}: {
  value: SignInSchemeInput;
}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: value.email_or_username },
          { username: value.email_or_username },
        ],
      },
    });

    if (!user) {
      return {
        error: "User not found",
        success: false,
      };
    }

    const passwordMatch = await compare(value.password, user.password!);

    if (!passwordMatch) {
      return {
        error: "Invalid password",
        success: false,
      };
    }

    return {
      user,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error signing in with credentials:", error);
    return {
      error: "An error occurred while signing in",
      success: false,
    };
  }
};

export default SignInWithCredential;
