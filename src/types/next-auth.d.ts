// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
    export interface User extends DefaultUser {
        customToken: string
    }
    export interface jwt {
        customToken: string
    }
    export interface Session {
        user: User
    }


}
