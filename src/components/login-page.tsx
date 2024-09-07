'use client'

import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';  // Track email, password, and errors
import { useRouter } from 'next/navigation';  // For redirecting after login
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const [email, setEmail] = useState('');  // Manage email input
  const [password, setPassword] = useState('');  // Manage password input
  const [error, setError] = useState('');  // Store error messages
  const router = useRouter();  // For navigation after login

  // Handle the form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  // Send email and password
      });

      const data = await res.json();  // Parse response data
      console.log(`data recieved: ${data}`)

      if (res.ok) {
        console.log(`res was ok`)
        // Store the JWT token in localStorage (or use cookies for more security)
        console.log('loggin succesful')
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);

        // Redirect to the dashboard page on successful login
        router.push('/dashboard');
        // window.location.reload()
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while logging in');
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-4xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary p-8 text-primary-foreground flex flex-col justify-between">
              <div>
                <Image
                  src="/images/logo.svg"
                  alt="App logo"
                  width={48}  // Set the width
                  height={48} // Set the height
                  className="mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">Welcome to ETFolio</h1>
                <p className="mb-6">Discover amazing features and boost your productivity</p>
              </div>
              <div className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg"
                    alt="App screenshot"
                    width={500}
                    height={300}
                    className="object-cover"
                    style={{
                      aspectRatio: '500 / 300',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <p className="text-sm">
                  Join thousands of users who trust our application for their daily tasks.
                </p>
              </div>
            </div>
            <CardContent className="md:w-1/2 p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Login</h2>
                {error && <p className="text-red-500">{error}</p>}  {/* Display errors if any */}
                <p className="text-muted-foreground">Enter your credentials to access your account</p>
                {/* <form onSubmit={handleLogin}> */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Set email state
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Set password state
                  />
                </div>
                <Button className="w-full" type="submit" onClick={handleLogin}>Login</Button>
                {/* </form> */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground w-max">or continue with</span>
                    </div>
                    <span className="w-full border-t" />
                  </div>
                </div>
                <Button className="w-full" variant="outline">
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
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link className="underline" href="/signup">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
