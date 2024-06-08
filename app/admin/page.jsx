'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';


export default function Admin() {
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
        <div className="container mx-auto p-4">
            {session && session.user.role === 'admin' && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Página del administrador</h1>
                    <div className="mb-4">
                        <Link href="/reservationsManager">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4">
                                Gestionar Reservas
                            </button>
                        </Link>
                        <Link href="/createDish">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-4">
                                Gestionar Platos
                            </button>
                        </Link>
                        
                        <Link href="/manageMenu">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 mr-4">
                                Gestionar Carta
                            </button>
                        </Link>
                        <Link href="/manageOrders">
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                                Gestionar Pedidos
                            </button>
                        </Link>
                    </div>
                    
                </>
            )}
        </div>
    );

}