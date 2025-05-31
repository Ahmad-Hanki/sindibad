"use server";
import { signOut } from "@/lib/auth";

const SignOutAction = async () => {
  await signOut();
  try {
  } catch (error) {
    throw new Error("An error occurred while signing out");
  }
};

export default SignOutAction;
