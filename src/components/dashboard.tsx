"use client"

import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function DashboardPage() {

    const { data: session } = useSession(); // NextAuth session
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            redirect("/login")
        }
    }, [session, router])


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session?.user?.name}!</p>
            <button onClick={() => { signOut() }}> logout </button>
        </div >
    )
}