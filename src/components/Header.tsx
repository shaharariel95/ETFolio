// // components/Header.tsx
// 'use client';

// import ThemeSwitch from './ThemeSwitch';
// import { Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
// import Navbar from './Navbar';

// export default function Header() {
//     return (
//         <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
//             {/* Mobile Navbar Trigger */}
//             <Sheet>
//                 <SheetTrigger asChild>
//                     <Button variant="outline" size="icon" className="lg:hidden border-gray-300 dark:border-gray-600">
//                         <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
//                         <span className="sr-only">Toggle navigation menu</span>
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-64 bg-white dark:bg-gray-800">
//                     <Navbar />
//                 </SheetContent>
//             </Sheet>

//             {/* Site Title */}
//             <h1 className="ml-4 text-2xl font-bold text-gray-800 dark:text-white">ETF Tracker</h1>

//             {/* Theme Switch */}
//             <ThemeSwitch />
//         </header>
//     );
// }
