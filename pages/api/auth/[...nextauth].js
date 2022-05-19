import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDataBase();
        /* console.log(credentials,"next auth credentials") */
        const usersCollection = client.db().collection("worker");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log(user, "find one next auth");
        console.log(user.profile.avatar, "user.profile.avatar");
        if (!user) {
          client.close();
          console.log("No user found next auth");
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          console.log("wrong pass next auth");
          throw new Error("Could not log you in");
        }
        console.log(user.profile.avatar, "user.profile.avatar");
        client.close();
        /* console.log(user._id.toString()); */
        return {
          _id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.profile.avatar,
          accountType: user.accountType,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // first time jwt callback is run, user object will be available
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar;
        token.accountType = user.accountType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.avatar = token.avatar;
        session.user.accountType = token.accountType;
      }
      /* console.log(session, token, "this is session callback"); */
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      /* console.log(user, "signIn part"); */
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
