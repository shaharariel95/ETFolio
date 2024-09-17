'use client';

import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, TrendingUp, PieChart, BarChart3, Settings, LogOut, Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/performance': 'Performance',
    '/portfolio': 'Portfolio',
    '/market': 'Market',
    '/settings': 'Settings',
};

const Navbar: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const pathname = usePathname();
    const [isSigningOut, setIsSigningOut] = useState(false);

    useEffect(() => {
        if (pathname) {
            setCurrentPage(routes[pathname] || 'Dashboard');
        }
    }, [pathname]);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
        } finally {
            setIsSigningOut(false);
        }
    };

    const NavContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ETFolio</h1>
                <h2 className="text-lg text-gray-600 dark:text-gray-300 mt-1">{currentPage}</h2>
            </div>
            <nav className="flex-grow mt-4">
                {Object.entries(routes).map(([route, label]) => (
                    <NavLink key={route} href={route} icon={getIcon(label)} label={label} currentPage={currentPage} />
                ))}
            </nav>
            <div className="p-4">
                <Button onClick={handleSignOut} variant="outline" className="w-full ring-1 justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" disabled={isSigningOut}>
                    {isSigningOut ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin mr-3"></div>
                    ) : (
                        <LogOut className="w-5 h-5 mr-3" />
                    )}
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Navbar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">ETFolio</h1>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className=" bg-white dark:bg-gray-800 w-64">
                            <NavContent />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop Navbar */}
            <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-sm overflow-y-auto fixed left-0 top-0 bottom-0">
                <NavContent />
            </aside>
        </>
    );
};

const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; currentPage: string }> = ({ href, icon, label, currentPage }) => {
    const isActive = currentPage === label;
    return (
        <Link href={href} className={`flex items-center px-4 py-2 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {icon}
            {label}
        </Link>
    );
};

const getIcon = (label: string) => {
    switch (label) {
        case 'Dashboard':
            return <Home className="w-5 h-5 mr-3" />;
        case 'Performance':
            return <TrendingUp className="w-5 h-5 mr-3" />;
        case 'Portfolio':
            return <PieChart className="w-5 h-5 mr-3" />;
        case 'Market':
            return <BarChart3 className="w-5 h-5 mr-3" />;
        case 'Settings':
            return <Settings className="w-5 h-5 mr-3" />;
        default:
            return null;
    }
};

export default Navbar;