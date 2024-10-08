'use client'

import Link from "next/link"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, useSession } from "next-auth/react"

export function LoginPage() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailtoset = email.toLowerCase()
    console.log(`user trying to login: ${emailtoset}, ${password}`)
    const res = await signIn('credentials', { email: emailtoset, password, redirect: false });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/2 bg-primary p-8 text-primary-foreground">
            <div>
              <Image
                src="/images/logo.svg"
                alt="App logo"
                width={48}
                height={48}
                className="mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Welcome to ETFolio</h1>
              <p className="mb-6 text-base">Discover amazing features and boost your productivity</p>
            </div>
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg"
                  alt="App screenshot"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-sm">
                Join thousands of users who trust our application for their daily tasks.
              </p>
            </div>
          </div>
          <CardContent className="lg:w-1/2 p-6 lg:p-8">
            <div className="space-y-4">
              <div className="lg:hidden flex items-center justify-center mb-4">
                <Image
                  src="/images/logo-dark.svg"
                  alt="App logo"
                  width={48}
                  height={48}
                  className="mr-2"
                />
                <h1 className="text-xl font-bold">ETFolio</h1>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold">Login</h2>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 lg:h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 lg:h-12"
                />
              </div>
              <Button className="w-full h-10 lg:h-12 text-sm lg:text-base" onClick={handleLogin}>Login</Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>
              <Button className="w-full h-10 lg:h-12 text-sm lg:text-base" variant="outline" onClick={() => signIn("google")}>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                </svg>
                Login with Google
              </Button>
              <Button className="w-full h-10 lg:h-12 text-sm lg:text-base" variant="outline" onClick={() => signIn("github")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Login with GitHub
              </Button>
              <p className="text-center text-xs lg:text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link className="underline" href="/signup">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}