import '../globals.css';
import SessionProvider from '@/app/providers/sessionProvider';
import CustomThemeProvider from '@/app/providers/themeProvider';
import Navbar from '@/components/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <SessionProvider>
                    <CustomThemeProvider>
                        <Navbar />
                        <div className="pt-16 lg:pl-64">
                            {children}
                        </div>
                    </CustomThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}