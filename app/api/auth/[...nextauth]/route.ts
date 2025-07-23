import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Session, Account, User } from "next-auth";


const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect || !user.emailVerified) return null;

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google") {
        const existing = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existing) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              emailVerified: true,
            },
          });
        }
      }
      return true;
    },

   async session({ session }: { session: Session }) {
      if (session.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          session.user.id = user.id;
        }
      }
      return session;
    },

  async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    return baseUrl + "/blog";
  },
}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
