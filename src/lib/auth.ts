import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcryptjs';
import connectToDatabase from "./mongodb";
import User from '@/models/User';


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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Connect to DB
                await connectToDatabase();

                // Find the user in the database
                console.log(`user trying to login: ${credentials?.email}, ${credentials?.password}`)
                const user = await User.findOne({ email: credentials?.email });
                console.log(`user found: ${user}`)
                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Check if password matches
                const isPasswordCorrect = await bcrypt.compare(credentials?.password as string, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Password is incorrect");
                }

                // user.name = user.firstName + " " + user.lastName
                return user;
            }
        })
    ],
    // debug: true,
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
                        // firstName: user.name?.split(' ')[0] || '',
                        // lastName: user.name?.split(' ').slice(1).join(' ') || '',
                        name: user.name,
                        provider: [account?.provider]
                    });
                }
                else {
                    await User.updateOne(
                        { email: user.email },
                        { $addToSet: { provider: account?.provider } }
                    );
                }
                user.name = dbUser.name
                return true
            }
            return false
        },
        async jwt({ token, trigger, session }) {
            if (trigger === 'update') {
                token.name = session.user.name;
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.name = token.name
            }
            return session
        },
    }
};



