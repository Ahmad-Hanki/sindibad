import NextAuth, {
  CredentialsSignin,
  AuthError,
  type DefaultSession,
} from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { signInScheme } from "@/app/[locale]/(auth)/_utils/auth-schemes";
import SignInWithCredential from "@/app/[locale]/(auth)/_actions/sign-in-credential";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
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

          // Return the user object with all properties you need
          if (result.user) {
            return result.user; // ✅ return only the user object
          }
          return null;
        } catch (error) {
          throw new AuthError(error as string | "Invalid credentials");
        }
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, user);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, token);
      }
      return session;
    },
  },
});
