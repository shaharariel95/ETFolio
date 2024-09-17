'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ThemeSwitch from '@/components/ThemeSwitch';
import { toast } from 'sonner';

export default function SettingsPage() {
    const [name, setName] = useState('John Doe');
    // const [email, setEmail] = useState('john.doe@example.com');
    const [deleteAccountEmail, setDeleteAccountEmail] = useState('');

    const handleNameChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Name updated successfully');
        } catch (error) {
            toast.error('Failed to update name');
        }
    };

    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        try {
            // Simulating API call
            console.log(currentPassword, newPassword)
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Password updated successfully');
        } catch (error) {
            toast.error('Failed to update password');
        }
    };

    const handleDeleteAccount = async () => {
        // TODO: put here the api for checking the email
        if (deleteAccountEmail !== 'email') {
            toast.error('Email address does not match');
            return;
        }
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Account deleted successfully');
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    return (
        <div className="p-4 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                    <form onSubmit={handleNameChange} className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="max-w-md"
                        />
                        <Button type="submit">Update Name</Button>
                    </form>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Security</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Change Password</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>
                                    Enter your current password and a new password.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="current-password" className="text-right">
                                        Current
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="new-password" className="text-right">
                                        New
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={() => handlePasswordChange('current', 'new')}>
                                    Change Password
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Preferences</h2>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="theme-switch">Dark Mode</Label>
                        <ThemeSwitch />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email-notifications" className="rounded text-primary focus:ring-primary" />
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="push-notifications" className="rounded text-primary focus:ring-primary" />
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Data Export</h2>
                    <Button variant="outline">Export Account Data</Button>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Danger Zone</h2>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="delete-account-email" className="text-right">
                                        Email
                                    </Label>
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
                                <AlertDialogAction asChild onClick={handleDeleteAccount}>
                                    <button className='bg-red-700 text-white'>
                                        Delete Account
                                    </button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}