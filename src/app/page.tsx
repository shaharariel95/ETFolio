'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session } = useSession();  // Get session data
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      router.push('/dashboard')
    }
  }, [session, router]);

  return (
    <div>
      {session ? <h1>Welcome, {session.user?.name}</h1> : <h1>Redirecting...</h1>}
    </div>
  );
}