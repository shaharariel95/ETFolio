import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import connectToDatabase from "./mongodb";
import User from '@/models/User';
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt', // Use JWT strategy for sessions
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            console.log(`init callback from ${account?.provider}:`);
            if (user) {
                console.log(`found user: `);
                console.log(user);
                await connectToDatabase();

                let dbUser = await User.findOne({ email: user.email });
                if (!dbUser) {
                    dbUser = await User.create({
                        email: user.email,
                        firstName: user.name?.split(' ')[0] || '',
                        lastName: user.name?.split(' ').slice(1).join(' ') || '',
                        provider: [account?.provider]
                    });
                }
                else {
                    await User.updateOne(
                        { email: user.email },
                        { $addToSet: { provider: account?.provider } }
                    );
                }
                const token = await new SignJWT({ userId: dbUser._id })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('1d')
                    .sign(JWT_SECRET);

                user.customToken = token
                return true
            }
            return false
        },
        async jwt({ token, user }) {
            if (user) {
                token.customToken = user.customToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.customToken = token.customToken as string
            return session;
        },
    }
    // callbacks: {
    //     async signIn({ user, account, profile }: { user: any; account: any | null; profile?: any }) {
    //         console.log(`inside signIn callback with user: ${profile?.email}`)
    //         if (account?.provider === "github") {
    //             try {
    //                 await connectToDatabase(); // Connect to DB

    //                 let dbUser = await User.findOne({ email: user.email });
    //                 if (!dbUser) {
    //                     dbUser = await User.create({
    //                         email: user.email,
    //                         firstName: user.name?.split(' ')[0] || '',
    //                         lastName: user.name?.split(' ').slice(1).join(' ') || '',
    //                     });
    //                 }

    //                 return true;
    //             } catch (error) {
    //                 console.error('Error in signIn callback:', error);
    //                 return false;
    //             }
    //         }
    //         return true;
    //     },
    //     async jwt({ token, user }: { token: any, user: any }) {
    //         if (user) {
    //             token.customToken = user.customToken;
    //         }
    //         return token;
    //     },
    //     async session({ session, token }: { session: any, token: any }) {
    //         session.customToken = token.customToken;
    //         return session;
    //     },
    // },
};

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


