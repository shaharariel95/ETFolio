'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from 'next/image';
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

export function SignupPage() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState('')
  // const [termsAccepted, setTermsAccepted] = useState(false)

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
    } else if (!/\d/.test(pass)) {
      setPasswordError('Password must contain at least one number')
    } else if (!/[a-z]/.test(pass) || !/[A-Z]/.test(pass)) {
      setPasswordError('Password must contain both uppercase and lowercase letters')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setPasswordError('Passwords do not match')
      return
    }
    // if (!termsAccepted) {
    //   alert('Please accept the terms of service')
    //   return
    // }
    // Here you would typically handle the signup process
    console.log('Signup submitted')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-primary p-8 text-primary-foreground flex flex-col justify-between">
            <div>
              <Image
                src="/images/logo.svg"
                alt="App logo"
                width={48}
                height={48}
                className="mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Welcome to ETFolio</h1>
              <p className="mb-6">Join our community and start your journey today!</p>
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
                Thousands of users trust our application for their daily tasks. Be part of our growing community!
              </p>
            </div>
          </div>
          <CardContent className="md:w-1/2 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <p className="text-muted-foreground">Create your account to get started</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validatePassword(e.target.value)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              {/* <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the <Link href="#" className="underline">terms of service</Link>
                </label>
              </div> */}
              <Button className="w-full" type="submit">Sign Up</Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link className="underline" href="/login">
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}