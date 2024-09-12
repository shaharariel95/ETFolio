'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, Home, LogOut, Menu, Moon, PieChart, Settings, Sun, TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from 'next-auth/react'

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
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4">
        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13.5L7 9.5L11 13.5L21 3.5" stroke={darkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 13.5L21 13.5" stroke={darkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 8.5V13.5H16" stroke={darkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>ETF Tracker</h1>
      </div>
      <nav className="flex-grow">
        <a href="#" className={`flex items-center px-4 py-2 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-700 bg-gray-200'}`}>
          <Home className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className={`flex items-center px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          <TrendingUp className="w-5 h-5 mr-3" />
          Performance
        </a>
        <a href="#" className={`flex items-center px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          <PieChart className="w-5 h-5 mr-3" />
          Portfolio
        </a>
        <a href="#" className={`flex items-center px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          <BarChart3 className="w-5 h-5 mr-3" />
          Market
        </a>
        <a href="#" className={`flex items-center px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </a>
      </nav>
      <div className="p-4">
        <Button onClick={() => { signOut() }} variant="outline" className={`w-full justify-start ${darkMode ? 'dark:text-gray-300 dark:border-gray-600  dark:hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div >
  )

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={`lg:hidden  ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <Menu className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} `} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <NavContent />
            </SheetContent>
          </Sheet>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} ml-2 lg:ml-0`}>Dashboard</h1>
        </div>
        <Button variant="outline" className="border-gray-300 dark:border-gray-600" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-700" />}
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className={`hidden lg:block w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <NavContent />
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 overflow-auto p-4 lg:p-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#4b5563'} />
                    <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} />
                    <Tooltip contentStyle={darkMode ? { backgroundColor: '#1f2937', border: 'none' } : undefined} />
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
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{etf.name}</span>
                    <span className={`font-bold ${etf.value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {etf.value}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}