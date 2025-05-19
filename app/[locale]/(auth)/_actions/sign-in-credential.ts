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
      throw new Error("User not found");
    }

    const passwordMatch = await compare(value.password, user.password!);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw new Error("An error occurred during sign-in");
  }
};

export default SignInWithCredential;
