// app/(auth)/layout.tsx
import SessionProvider from '@/app/providers/sessionProvider';
import '../globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <SessionProvider>
                    <div className="flex-1 overflow-auto">{children}</div> {/* Page content without navbar */}
                </SessionProvider>
            </body>
        </html>
    );
}
