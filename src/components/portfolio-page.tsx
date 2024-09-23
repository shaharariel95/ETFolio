"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for ETFs
const etfList = [
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF" },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF" },
    { symbol: "QQQ", name: "Invesco QQQ Trust" },
    // Add more ETFs as needed
]

interface ETF {
    symbol: string
    name: string
    shares: number
    purchaseDate: Date
    currentPrice: number
}

export default function Component() {
    const [userEtfs, setUserEtfs] = useState<ETF[]>([
        {
            symbol: "VTI",
            name: "Vanguard Total Stock Market ETF",
            shares: 10,
            purchaseDate: new Date("2023-01-15"),
            currentPrice: 220.5,
        },
        {
            symbol: "VOO",
            name: "Vanguard S&P 500 ETF",
            shares: 5,
            purchaseDate: new Date("2023-03-20"),
            currentPrice: 410.75,
        },
    ])

    const [newEtf, setNewEtf] = useState({
        symbol: "",
        shares: 0,
        purchaseDate: new Date(),
    })

    const addEtf = () => {
        const selectedEtf = etfList.find((etf) => etf.symbol === newEtf.symbol)
        if (selectedEtf) {
            setUserEtfs([
                ...userEtfs,
                {
                    ...selectedEtf,
                    shares: newEtf.shares,
                    purchaseDate: newEtf.purchaseDate,
                    currentPrice: Math.random() * 500 + 100, // Mock current price
                },
            ])
            setNewEtf({ symbol: "", shares: 0, purchaseDate: new Date() })
        }
    }

    const deleteEtf = (index: number) => {
        setUserEtfs(userEtfs.filter((_, i) => i !== index))
    }

    const totalValue = userEtfs.reduce((sum, etf) => sum + etf.shares * etf.currentPrice, 0)

    return (
        <div className="p-4 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium">Total Value</p>
                            <p className="text-lg md:text-2xl font-bold">${totalValue.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Number of ETFs</p>
                            <p className="text-lg md:text-2xl font-bold">{userEtfs.length}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Add New ETF</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="etf-select">Select ETF</Label>
                            <Select onValueChange={(value) => setNewEtf({ ...newEtf, symbol: value })}>
                                <SelectTrigger id="etf-select">
                                    <SelectValue placeholder="Select an ETF" />
                                </SelectTrigger>
                                <SelectContent>
                                    {etfList.map((etf) => (
                                        <SelectItem key={etf.symbol} value={etf.symbol}>
                                            {etf.symbol} - {etf.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shares">Number of Shares</Label>
                            <Input
                                id="shares"
                                type="number"
                                value={newEtf.shares}
                                onChange={(e) => setNewEtf({ ...newEtf, shares: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purchase-date">Purchase Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newEtf.purchaseDate && "text-muted-foreground"
                                        )}
                                    >
                                        {newEtf.purchaseDate ? (
                                            format(newEtf.purchaseDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newEtf.purchaseDate}
                                        onSelect={(date) => date && setNewEtf({ ...newEtf, purchaseDate: date })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={addEtf} className="w-full md:w-auto">Add ETF</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Your ETFs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Symbol</TableHead>
                                    <TableHead className="hidden md:table-cell">Name</TableHead>
                                    <TableHead>Shares</TableHead>
                                    <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                                    <TableHead>Current Price</TableHead>
                                    <TableHead>Total Value</TableHead>
                                    <TableHead className="hidden md:table-cell">Gain/Loss</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userEtfs.map((etf, index) => {
                                    const totalValue = etf.shares * etf.currentPrice
                                    const gainLoss = totalValue - etf.shares * 100 // Assuming purchase price of $100 for simplicity
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{etf.symbol}</TableCell>
                                            <TableCell className="hidden md:table-cell">{etf.name}</TableCell>
                                            <TableCell>{etf.shares}</TableCell>
                                            <TableCell className="hidden md:table-cell">{format(etf.purchaseDate, "PP")}</TableCell>
                                            <TableCell>${etf.currentPrice.toFixed(2)}</TableCell>
                                            <TableCell>${totalValue.toFixed(2)}</TableCell>
                                            <TableCell className={`hidden md:table-cell ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                ${gainLoss.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Edit ETF">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => deleteEtf(index)} aria-label="Delete ETF">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}