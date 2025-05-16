import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { Session } from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        await connectDB();

        const userFound = await User.findOne({
          username: credentials!.username,
        }).select("+password");

        if (!userFound) throw new Error("Invalid Credentials");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid Credentials");

        return {
          id: userFound._id.toString(),
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
          alias: userFound.alias,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as Session["user"];
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
