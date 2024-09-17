'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Jan', value: 4000, prediction: 4100 },
  { name: 'Feb', value: 3000, prediction: 3200 },
  { name: 'Mar', value: 5000, prediction: 5100 },
  { name: 'Apr', value: 4500, prediction: 4700 },
  { name: 'May', value: 6000, prediction: 6200 },
  { name: 'Jun', value: 5500, prediction: 5800 },
  { name: 'Jul', prediction: 6100 },
  { name: 'Aug', prediction: 6400 },
  { name: 'Sep', prediction: 6700 },
]

const topETFs = [
  { name: 'VOO', value: '+15.2%' },
  { name: 'VTI', value: '+12.8%' },
  { name: 'QQQ', value: '+18.5%' },
  { name: 'ARKK', value: '-5.3%' },
  { name: 'SPY', value: '+14.9%' },
]

export default function DashboardPage() {
  return (
    <div className="p-4 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">$124,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">+5.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>YTD Return</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">+12.7%</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Growth & Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top ETFs */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing ETFs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {topETFs.map((etf, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">{etf.name}</span>
                <span className={`font-bold ${etf.value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {etf.value}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}