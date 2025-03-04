import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("🔹 Received Credentials:", credentials);

        const db = await getDatabase(); // ✅ Move this inside `authorize()`
        const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [credentials.email]);

        if (rows.length === 0) {
          console.log("❌ User not found:", credentials.email);
          throw new Error("User not found");
        }

        const user = rows[0];
        console.log("✅ Found User in DB:", user);

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          console.log("❌ Invalid password for:", user.email);
          throw new Error("Invalid credentials");
        }

        console.log("✅ Returning User Object:", { id: user.userId, name: user.name, email: user.email });

        return { id: user.userId, name: user.name, email: user.email }; // ✅ Ensure `id` is included
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🔹 Storing user ID in JWT:", user.id);
        token.id = user.id; // ✅ Store user ID in JWT
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🔹 Storing user ID in session:", token.id);
      session.user.id = token.id || null; // ✅ Ensure user ID is included
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
