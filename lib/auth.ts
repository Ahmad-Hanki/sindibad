import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { signInScheme } from "@/app/[locale]/(auth)/_utils/auth-schemes";
import SignInWithCredential from "@/app/[locale]/(auth)/_actions/sign-in-credential";
import { generateUniqueUsername } from "@/server-actions/generate/generateUniqueUsername";

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
              id: result.user.id, // MUST be string
              name: result.user.name,
              email: result.user.email,
              image: result.user.image,
              username: result.user.username,
              admin: result.user.admin,
              createdAt: result.user.createdAt,
              updatedAt: result.user.updatedAt,
              emailVerified: result.user.emailVerified,
              password: "",
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
      if (user) {
        // For Google OAuth users, if username is missing, generate & save it
        if (!user.username && user.email) {
          const uniqueUsername = await generateUniqueUsername(user.email);
          await prisma.user.update({
            where: { id: user.id },
            data: { username: uniqueUsername },
          });
          // Assign username to user object so Object.assign picks it up
          user.username = uniqueUsername;
        }
        // Merge user fields generically into token
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
