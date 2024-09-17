import '../globals.css';
import { Toaster } from 'sonner';
import SessionProvider from '@/app/providers/sessionProvider';
import CustomThemeProvider from '@/app/providers/themeProvider';
import Navbar from '@/components/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <SessionProvider>
                    <CustomThemeProvider>
                        <div className="flex">
                            <Navbar />
                            <div className="flex-1 lg:ml-64">
                                {children}
                            </div>
                        </div>
                        <Toaster />
                    </CustomThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}