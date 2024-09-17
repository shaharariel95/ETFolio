'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = [
    { month: 'Jan', return: 5.2, benchmark: 4.8 },
    { month: 'Feb', return: -2.1, benchmark: -1.5 },
    { month: 'Mar', return: 3.7, benchmark: 3.2 },
    { month: 'Apr', return: 1.9, benchmark: 2.1 },
    { month: 'May', return: 4.5, benchmark: 3.9 },
    { month: 'Jun', return: -0.8, benchmark: -0.5 },
];

const topPerformers = [
    { name: 'VTI', return: 15.2 },
    { name: 'QQQ', return: 22.8 },
    { name: 'VGT', return: 18.5 },
    { name: 'VYM', return: 10.3 },
    { name: 'VNQ', return: 8.7 },
];

const underperformers = [
    { name: 'GLD', return: -2.3 },
    { name: 'SLV', return: -4.1 },
    { name: 'VWO', return: -1.8 },
    { name: 'BNDX', return: -0.9 },
    { name: 'VPU', return: -0.5 },
];

export default function PerformancePage() {
    return (
        <div className="p-4 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Performance</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Performance vs Benchmark</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="return" stroke="#8884d8" name="Portfolio" />
                                    <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" name="Benchmark" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topPerformers}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="return" fill="#8884d8" name="Return %" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Underperformers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {underperformers.map((etf, index) => (
                                <li key={index} className="py-3 flex justify-between items-center">
                                    <span className="font-medium">{etf.name}</span>
                                    <span className="text-red-600">{etf.return.toFixed(1)}%</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">Alpha</h3>
                                <p className="text-2xl font-bold text-green-600">1.8%</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Beta</h3>
                                <p className="text-2xl font-bold">0.92</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Sharpe Ratio</h3>
                                <p className="text-2xl font-bold">1.35</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Max Drawdown</h3>
                                <p className="text-2xl font-bold text-red-600">-12.5%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}