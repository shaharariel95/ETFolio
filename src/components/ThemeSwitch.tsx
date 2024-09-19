// components/ThemeSwitch.tsx
'use client';

import { useTheme } from 'next-themes';
import { ThemeSelectionCard } from './theme-selection-card';
// import { SetStateAction } from 'react';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    // const toggleTheme = () => {
    //     setTheme(theme === 'dark' ? 'light' : 'dark');
    // };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Theme mode</h3>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Day theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ThemeSelectionCard
                            title="Light"
                            isActive={theme === 'light'}
                            isSelected={theme === 'light'}
                            previewSrc='/images/light-preview.svg'
                            onClick={() => setTheme('light')}
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Night theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                    <ThemeSelectionCard
                        title="Dark"
                        isActive={theme === 'dark'}
                        isSelected={theme === 'dark'}
                        previewSrc='/images/dark-preview.svg'
                        onClick={() => setTheme('dark')}
                    />
                </div>
            </div>
        </div>
    );
}
