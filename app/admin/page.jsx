'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        
        if (status === 'authenticated' && session?.user?.role !== 'admin') {
           
            router.push('/');
        }
    }, [session, status, router]);

    
    return (
        <div>
            {session && session.user.role === 'admin' && (
                <h1>Pagina del admin</h1>
            )}
        </div>
    );
}
