import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SignInResponse } from "next-auth/react";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { signInScheme } from "@/app/[locale]/(auth)/_utils/auth-schemes";
import SignInWithCredential from "@/app/[locale]/(auth)/_actions/sign-in-credential";
import { redirect } from "next/navigation";
const adapter = PrismaAdapter(prisma);
export class InvalidLoginError extends CredentialsSignin {
  // This can be changed, but only to another ErrorType (e.g., 'AccessDenied')
  // static type = "CredentialsSignin"
  code = "invalid_credentials";
}

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

          if (!result) {
            return null;
          }
          // Return only the necessary user fields
          return result;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account?.provider === "credentials") {
  //       token.credentials = true;
  //     }
  //     return token;
  //   },
  // },

  // jwt: {
  //   encode: async function (params) {
  //     if (params.token?.credentials) {
  //       const sessionToken = uuid();

  //       if (!params.token.sub) {
  //         throw new Error("No user ID found in token");
  //       }

  //       const createdSession = await adapter?.createSession?.({
  //         sessionToken: sessionToken,
  //         userId: params.token.sub,
  //         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // seven days
  //       });

  //       if (!createdSession) {
  //         throw new Error("Failed to create session");
  //       }

  //       return sessionToken;
  //     }
  //     return defaultEncode(params);
  //   },
  // },
});
