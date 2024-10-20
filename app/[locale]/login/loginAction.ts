"use server";

import { cookies } from "next/headers";

const loginAction = async (password: string) => {
  const correctPassword = process.env.ADMIN_PASSWORD as string;

  const cookie = cookies();

  const oneDay = 24 * 60 * 60 * 1000;

  if (correctPassword == password) {
    cookie.set({
      name: "admin",
      value: "logged-in",
      httpOnly: true,
      expires: Date.now() + oneDay,
      path: "/",
    });

    return true;
  }

  return false;
};
export default loginAction;
