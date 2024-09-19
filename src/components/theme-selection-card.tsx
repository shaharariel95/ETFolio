import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface ThemeSelectionCardProps {
    title: string
    isActive: boolean
    previewSrc: string
    isSelected: boolean
    onClick: () => void
}

export function ThemeSelectionCard({ title, isActive, previewSrc, isSelected, onClick }: ThemeSelectionCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {title}
                    {isActive && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Active
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src={previewSrc}
                    alt={`${title} preview`}
                    width={228}
                    height={120}
                    className="w-full h-auto"
                />
            </CardContent>
        </Card>
    )
}