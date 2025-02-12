import { v4 as uuid } from "uuid";
import prisma from "@/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token: any;
      user?: User & { phoneNumber?: string };
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }
      return session;
    },
  },
  jwt: {
    async encode({ token }) {
      if (!token?.id) {
        throw new Error("Invalid token: missing user ID");
      }

      const sessionToken = uuid();
      await prisma.session.create({
        data: {
          sessionToken,
          userId: token.id as string,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return sessionToken;
    },
    async decode({ token }) {
      if (!token) {
        return null;
      }

      const session = await prisma.session.findUnique({
        where: { sessionToken: token },
        include: { user: true },
      });

      return session
        ? {
            id: session.userId,
            email: session.user.email,
            name: session.user.name,
            phoneNumber: session.user.phoneNumber,
          }
        : null;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
