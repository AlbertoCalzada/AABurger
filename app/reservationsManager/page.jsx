'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import ActualReservationsManager from '../../components/reservationsManager';

export default function ReservationsManagerWrapper() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            if (!session || (session.user.role !== 'admin')) {
                router.push('/');
            }
        } else if (status === 'loading') {

        } else {

            router.push('/');
        }
    }, [session, status, router]);

    return (
        <div>
            {session && session.user.role === 'admin' && (
                <>
                    <ActualReservationsManager />
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                    >
                        Volver atrás
                    </button>
                </>
            )}
        </div>
    );
}
