// next-auth.d.ts
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: PrismaUser;
  }

  interface User extends PrismaUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends PrismaUser {}
}
