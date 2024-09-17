// app/(auth)/layout.tsx
import '../globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <div className="flex-1 overflow-auto">{children}</div> {/* Page content without navbar */}
            </body>
        </html>
    );
}
