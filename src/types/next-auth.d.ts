import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        name?: string | null
        email?: string | null
        // ... other properties
    }

    interface Session {
        user: User;
        // ... other properties
    }
}