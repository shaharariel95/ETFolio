'use client'

import { useTheme } from 'next-themes'
import { ThemeSelectionCard } from './theme-selection-card'

export default function Component() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Theme mode</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Day theme</h3>
                    <ThemeSelectionCard
                        title="Light"
                        isActive={theme === 'light'}
                        isSelected={theme === 'light'}
                        previewSrc="/images/light_preview.svg"
                        onClick={() => setTheme('light')}
                    />
                </div>
                <div className="space-y-4 ">
                    <h3 className="text-lg font-medium ">Night theme</h3>
                    <ThemeSelectionCard
                        title="Dark"
                        isActive={theme === 'dark'}
                        isSelected={theme === 'dark'}
                        previewSrc="/images/dark_preview.svg"
                        onClick={() => setTheme('dark')}
                    />
                </div>
            </div>
        </div>
    )
}