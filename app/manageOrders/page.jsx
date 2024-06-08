'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getOrdersAPI, updateOrderAPI } from '../api/order/order';
import { getDishByIdAPI } from '../api/dish/dish';

export default function ManageOrders() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [dishDetails, setDishDetails] = useState({});

    useEffect(() => {
        if (status === 'authenticated') {
            if (!session || session.user.role !== 'admin') {
                router.push('/');
            } else {
                fetchOrders();
            }
        } else if (status === 'loading') {

        } else {
            router.push('/');
        }
    }, [session, status, router]);

    const fetchOrders = async () => {
        try {
            const ordersResponse = await getOrdersAPI();
            const sortedOrders = ordersResponse.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setOrders(sortedOrders);

            // Ordenamos  de manera ascendente 
            for (const order of sortedOrders) {
                const dishDetails = await getDishDetails(order.items);
                setDishDetails(prevState => ({ ...prevState, [order._id]: dishDetails }));
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Error al obtener los pedidos. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    
    
    const getDishDetails = async (items) => {
        try {
            const dishDetails = {};
            for (const item of items) {
                const dishId = item.dishId;
                const dishResponse = await getDishByIdAPI(dishId);
                const dishData = dishResponse.data;
                dishDetails[dishId] = dishData;
            }
            return dishDetails;
        } catch (error) {
            console.error('Error fetching dish details:', error);
            return null;
        }
    };

    const handleUpdateOrderStatus = async (id, newStatus) => {
        try {
            await updateOrderAPI(id, { status: newStatus });
            fetchOrders(); 
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Error al actualizar el estado del pedido.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            {session && session.user.role === 'admin' && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Gestionar Pedidos</h1>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Cliente</th>
                                <th className="py-2">Direccion</th>
                                <th className="py-2">Precio Total</th>
                                <th className="py-2">Estado</th>
                                <th className="py-2">Platos Pedidos</th>
                                <th className="py-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="py-2">{order.customerName}</td>
                                    <td className="py-2">{order.customerContact}</td>
                                    <td className="py-2">{order.totalPrice}</td>
                                    <td className="py-2">{order.status}</td>
                                    <td className="py-2">
                                    <ul>
                                            {dishDetails[order._id] &&
                                                Object.values(dishDetails[order._id]).map((dish, index) => (
                                                    <li key={index}>{order.items.find(item => item.dishId === dish._id)?.quantity}x {dish.name} - {dish.price} €</li>
                                                ))}
                                        </ul>
                                    </td>
                                    <td className="py-2">
                                        {order.status !== 'delivered' && (
                                            <div className="flex space-x-2">
                                                {order.status !== 'preparing' && (
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(order._id, 'preparing')}
                                                        className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Preparar
                                                    </button>
                                                )}
                                                {order.status !== 'ready' && (
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(order._id, 'ready')}
                                                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                                    >
                                                        Listo
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleUpdateOrderStatus(order._id, 'delivered')}
                                                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition duration-300"
                                                >
                                                    Entregado
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
