// import clientPromise from "@/lib/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const adminEmails = [
    "azerckid@gmail.com",
    "zizimoos@gmail.com",
    "dragoncyr46@gmail.com",
    "rsnchi2@gmail.com",
    "choonsim.dev@gmail.com",
];
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session, token, user }) => {
            console.log({ session, token, user });
            if (session.user.email && adminEmails.includes(session.user.email)) {
                session.user.isAdmin = true;
                return session;
            } else {
                session.user.isAdmin = false;
                return false;
            }
        },
    },
};
export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (adminEmails.includes(session.user.email)) {
        return true;
    } else {
        res.status(401);
        res.end();
        throw new Error("Unauthorized");
    }
}