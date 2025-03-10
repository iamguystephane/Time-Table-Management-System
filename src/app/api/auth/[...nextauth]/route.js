import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../../lib/mongodb-connect";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const formData = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email: formData.email });
          if (!user) {
            console.log("user not found");
            throw new Error("User not found");
          }
          const isPasswordCorrect = await bcrypt.compare(
            formData.password,
            user.password
          );
          if (!isPasswordCorrect) {
            console.log("Password is incorrect");
            throw new Error("Password is incorrect");
          }
          console.log(user);
          return user;
        } catch (error) {
          console.log("error: ", error);
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.status = user.status;
        token.names = user.names;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.status = token.status;
      session.names = token.names;
      session.phone = token.phone;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
