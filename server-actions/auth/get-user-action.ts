"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

const getUserAction = async (): Promise<User | null> => {
  try {
    const session = await auth();
    const id = session?.user?.id;

    if (!id) {
      return null;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getUserAction;
