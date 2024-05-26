'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import ReservationsManager from '../../components/reservationsManager';

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
                <>
                <h1>Página del administrador</h1>
                <div>
                    <Link href="/reservationsManager">
                        <button>Ir a Administrar Reservas</button>
                    </Link>
                    <br />
                    <Link href="/create-dish">
                        <button>Crear un Plato</button>
                    </Link>
                    {/* Agrega más botones aquí para otras secciones */}
                </div>
            </>
            )}
        </div>
    );
}
