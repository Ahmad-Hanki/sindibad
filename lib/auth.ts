import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { signInScheme } from "@/app/[locale]/(auth)/_utils/auth-schemes";
import SignInWithCredential from "@/server-actions/auth/sign-in-credential";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email_or_username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const schema = signInScheme("");
          const validatedCredentials = schema.parse(credentials);
          const result = await SignInWithCredential({
            value: validatedCredentials,
          });

          if (!result.success && result.error) {
            throw new AuthError(result.error);
          }

          if (result.user) {
            return {
              id: result.user.id,
            };
          }
          return null;
        } catch (error) {
          throw new AuthError(error as string | "Invalid credentials");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id; // Only store id
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
