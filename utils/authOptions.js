import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // 1 connect to database
      await connectDB();
      // 2 check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3 if not add user to database
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4 return true to allow signIn

      //   if (account.provider === "google") {
      //     return profile.email_verified && profile.email.endsWith("@example.com");
      //   }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session }) {
      //1 Get user from the database
      const user = await User.findOne({ email: session.user.email });
      // 2 Assign the user id to the session
      session.user.id = user._id.toString();
      return session;
    },
  },
};

export default authOptions;
