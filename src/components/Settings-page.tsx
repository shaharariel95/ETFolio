"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner'
import { Sun, User, Lock, Bell, Download } from 'lucide-react'
import ThemeSwitch from '@/components/ThemeSwitch'

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [name, setName] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [deleteAccountEmail, setDeleteAccountEmail] = useState('')

    useEffect(() => {
        if (session && session.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    const handleNameChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/settings/name', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                toast.success('Name updated successfully');
                await update({
                    user: {
                        ...session?.user,
                        name: name
                    }
                })
            } else {
                toast.error('Failed to update name');
            }
        } catch (error) {
            toast.error('Failed to update name');
        }
    };


    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        try {
            const res = await fetch('/api/settings/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json()

            if (res.ok) {
                toast.success('Password updated successfully');
            } else {
                toast.error(data.error || 'Failed to update password');
            }
        } catch (error) {
            toast.error('Failed to update password');
        }
    };

    const validatePassword = (pass: string) => {
        if (pass.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else if (!/\d/.test(pass)) {
            setPasswordError('Password must contain at least one number');
        } else if (!/[a-z]/.test(pass) || !/[A-Z]/.test(pass)) {
            setPasswordError('Password must contain both uppercase and lowercase letters');
        } else {
            setPasswordError('');
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteAccountEmail.toLowerCase() !== session?.user?.email) {
            toast.error('Email address does not match');
            return;
        }
        try {
            const res = await fetch('/api/settings/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: deleteAccountEmail.toLowerCase() })
            });
            if (res.ok) {
                toast.success('Account deleted successfully');
                window.location.href = '/api/auth/signout'; // Sign out and redirect
            } else {
                toast.error('Failed to delete account');
            }
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white p-4 lg:p-8">
            <div className="max-w-4xl mx-auto pt-28">
                <h1 className="text-4xl font-bold mb-8">Settings</h1>
                <div className="relative glowing-border">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-900 blur opacity-20 animate-pulse"></div> */}
                    <Tabs defaultValue="profile" className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-700 p-1 h-10">
                            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-gray-400 "><User size={16} /> Profile</TabsTrigger>
                            <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-gray-400"><Sun size={16} /> Appearance</TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-gray-400"><Lock size={16} /> Security</TabsTrigger>
                            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-gray-400"><Bell size={16} /> Notifications</TabsTrigger>
                            <TabsTrigger value="data" className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-gray-400"><Download size={16} /> Data</TabsTrigger>
                        </TabsList>
                        <div className="p-6">
                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Public Profile</CardTitle>
                                        <CardDescription>Manage your public information</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleNameChange} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <Button type="submit">Update Profile</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="appearance">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Theme preferences</CardTitle>
                                        <CardDescription>
                                            Choose how the application looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <ThemeSwitch />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security</CardTitle>
                                        <CardDescription>Manage your account security</CardDescription>
                                    </CardHeader>
                                    <CardContent className="mx-auto pt-5 flex justify-between">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Change Password</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Change Password</DialogTitle>
                                                    <DialogDescription>Enter your current password and a new password.</DialogDescription>
                                                    <DialogDescription>If you dont have a password, Enter the new one and it will be set</DialogDescription>
                                                    <DialogDescription>{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="current-password" className="text-right">Current</Label>
                                                        <Input id="current-password" onChange={(e) => { setCurrentPassword(e.target.value) }} type="password" className="col-span-3" />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="new-password" className="text-right">New</Label>
                                                        <Input id="new-password" onChange={(e) => { setNewPassword(e.target.value); validatePassword(e.target.value) }} type="password" className="col-span-3" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={() => handlePasswordChange(currentPassword, newPassword)}>Change Password</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Delete Account</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="delete-account-email" className="text-right">Email</Label>
                                                        <Input
                                                            id="delete-account-email"
                                                            value={deleteAccountEmail}
                                                            onChange={(e) => setDeleteAccountEmail(e.target.value)}
                                                            className="col-span-3"
                                                            placeholder="Enter your email to confirm"
                                                        />
                                                    </div>
                                                </div>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDeleteAccount} className='bg-red-800 text-white'>Delete Account</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="notifications">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notifications</CardTitle>
                                        <CardDescription>Manage your notification preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-notifications">Email Notifications</Label>
                                            <Switch id="email-notifications" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-notifications">Push Notifications</Label>
                                            <Switch id="push-notifications" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="data">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Data Management</CardTitle>
                                        <CardDescription>Export or delete your account data</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button variant="outline" className="w-full">Export Account Data</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}