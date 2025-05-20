import prisma from "@/lib/db";
import { nanoid } from "nanoid";

export async function generateUniqueUsername(email?: string): Promise<string> {
  const baseUsername = (email?.split("@")[0] ?? "user")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  let username = baseUsername;
  let suffix = "";
  let exists = true;

  while (exists) {
    const candidate = username + suffix;
    const user = await prisma.user.findUnique({
      where: { username: candidate },
    });

    if (!user) {
      exists = false;
      username = candidate;
    } else {
      suffix = "-" + nanoid(4);
    }
  }

  return username;
}
