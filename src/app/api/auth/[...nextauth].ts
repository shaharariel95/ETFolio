// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     secret: process.env.JWT_SECRET,
//     session: {
//         jwt: true,
//     },
//     callbacks: {
//         async jwt({ token, account }) {
//             if (account) {
//                 token.accessToken = account.access_token;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.accessToken = token.accessToken;
//             return session;
//         },
//     },
// });
