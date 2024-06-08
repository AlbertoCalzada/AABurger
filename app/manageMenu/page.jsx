'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getDishesAPI, updateDishAPI } from '../api/dish/dish';

export default function ManageMenu() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dishes, setDishes] = useState([]); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'authenticated') {
            if (!session || session.user.role !== 'admin') {
                router.push('/');
            } else {
                fetchDishes();
            }
        } else if (status === 'loading') {

        } else {
            router.push('/');
        }
    }, [session, status, router]);

    const fetchDishes = async () => {
        try {
            const response = await getDishesAPI();
            if (response.success && Array.isArray(response.data)) {
                setDishes(response.data);
            } else {
                console.error('La respuesta de getDishesAPI() no es válida:', response);
                setError('Error al obtener los platos. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error fetching dishes:', error);
            setError('Error al obtener los platos. Por favor, inténtalo de nuevo más tarde.');
        }
    };


    const toggleIsInMenu = async (dishId, currentStatus) => {
        try {
            await updateDishAPI(dishId, { isInMenu: !currentStatus });
            fetchDishes();
        } catch (error) {
            console.error('Error updating dish:', error);
            setError('Error al actualizar el estado del plato. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    if (status === 'loading') {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {session && session.user.role === 'admin' && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Gestionar Carta</h1>
                    
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Imagen</th>
                                <th className="py-2">Nombre</th>
                                <th className="py-2">Descripción</th>
                                <th className="py-2">Precio</th>
                                <th className="py-2">Tipo</th>
                                <th className="py-2">En Carta</th>
                                <th className="py-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dishes.map((dish) => (
                                <tr key={dish._id}>
                                    <td className="py-2"><img src={`img/menu/${dish.image}`} alt={dish.name} width="50" /></td>
                                    <td className="py-2">{dish.name}</td>
                                    <td className="py-2">{dish.description}</td>
                                    <td className="py-2">{dish.price} €</td>
                                    <td className="py-2">{dish.type}</td>
                                    <td className="py-2">{dish.isInMenu ? 'Sí' : 'No'}</td>
                                    <td className="py-2">
                                        <button
                                            onClick={() => toggleIsInMenu(dish._id, dish.isInMenu)}
                                            className={`px-4 py-2 rounded ${dish.isInMenu ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition duration-300`}
                                        >
                                            {dish.isInMenu ? 'Quitar del Menú' : 'Añadir al Menú'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 mb-4"
                    >
                        Volver atrás
                    </button>
                </>
            )}
        </div>
    );
}
