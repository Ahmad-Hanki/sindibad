import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { SignInValidateScheme } from "./auth-scheme";
const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},

        
      },
      authorize: async (credentials) => {
        const validatedCredentials = SignInValidateScheme.parse(credentials);

        if (!validatedCredentials) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: validatedCredentials.email as string,
            // password: validatedCredentials.password as string,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        } else if (
          credentials.email === user.email
          // credentials.password === user.password
        ) {
          return user;
        } else throw new Error("Invalid credentials");
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
