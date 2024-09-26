"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mockup ETF list for selection
const etfList = [
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF" },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF" },
    { symbol: "QQQ", name: "Invesco QQQ Trust" },
];

interface ETF {
    symbol: string;
    name: string;
    shares: number;
    purchaseDate: Date;
    purchaseCost: number,
    currentPrice: number;
}

export default function PortfolioPage() {
    const [etfs, setEtfs] = useState<ETF[]>([]);
    const [newEtf, setNewEtf] = useState({
        symbol: "",
        shares: 0,
        purchaseCost: 0,
        purchaseDate: new Date(),
    });

    // Fetch ETFs for the logged-in user
    useEffect(() => {
        const fetchEtfs = async () => {
            const res = await fetch("/api/etfs/user");
            if (res.ok) {
                const data = await res.json();
                setEtfs(data);
            }
        };
        fetchEtfs();
    }, []);

    // Add ETF to the portfolio
    const addEtf = async () => {
        const selectedEtf = etfList.find((etf) => etf.symbol === newEtf.symbol);
        if (selectedEtf) {
            const res = await fetch("/api/etfs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    symbol: newEtf.symbol,
                    name: selectedEtf.name,
                    shares: newEtf.shares,
                    purchaseCost: newEtf.purchaseCost,
                    purchaseDate: newEtf.purchaseDate,
                    currentPrice: Math.random() * 500 + 100, // Mock price logic
                }),
            });
            if (res.ok) {
                const etf = await res.json();
                setEtfs([...etfs, etf.etf]);
                setNewEtf({ symbol: "", shares: 0, purchaseCost: 0, purchaseDate: new Date() });
            }
        }
    };

    const totalValue = etfs.reduce((sum, etf) => {
        if (!etf) return sum;  // Skip undefined entries
        return sum + etf.shares * etf.currentPrice;
    }, 0);


    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 sm:pt-24">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Portfolio Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium">Total Value</p>
                                <p className="text-lg sm:text-2xl font-bold">${totalValue.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Number of ETFs</p>
                                <p className="text-lg sm:text-2xl font-bold">{etfs.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Add New ETF</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                            {newEtf.purchaseDate ? format(newEtf.purchaseDate, "PPP") : <span>Pick a date</span>}
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
                            <div className="space-y-2">
                                <Label htmlFor="purchaseCost">Cost at time of Purchase</Label>
                                <Input
                                    id="purchaseCost"
                                    type="number"
                                    value={newEtf.purchaseCost}
                                    onChange={(e) => setNewEtf({ ...newEtf, purchaseCost: Number(e.target.value) })}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button onClick={addEtf} className="w-full">Add ETF</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Your ETFs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {etfs.map((etf, index) => {
                                const totalValue = etf?.shares * etf?.currentPrice;
                                const gainLoss = totalValue - etf?.shares * 100;
                                return (
                                    <Card key={index}>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-lg font-semibold">{etf.symbol}</h3>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Edit ETF">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Delete ETF">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{etf.name}</p>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div>
                                                    <p className="text-sm font-medium">Shares</p>
                                                    <p>{etf.shares}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Purchase Date</p>
                                                    <p>{format(etf.purchaseDate, "PP")}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Current Price</p>
                                                    <p>${etf.currentPrice.toFixed(2)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Total Value</p>
                                                    <p>${totalValue.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm font-medium">Gain/Loss</p>
                                                <p className={gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                                                    ${gainLoss.toFixed(2)}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
