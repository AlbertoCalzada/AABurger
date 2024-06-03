'use client'
import React, { useState, useEffect } from 'react';
import { getDishesAPI } from '../api/dish/dish';
import { handleOrderAPI } from '../api/order/order';
import { useSession } from 'next-auth/react';

const CreateOrderPage = () => {
    const [dishes, setDishes] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({ name: '', contact: '' });
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);


    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const data = await getDishesAPI();
            setDishes(data.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
            setError('Error al cargar los platos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleAddToOrder = (dish) => {
        setOrderItems([...orderItems, { dishId: dish._id, name: dish.name, quantity: 1 }]);
    };

    const handleOrderChange = (index, quantity) => {
        const newOrderItems = [...orderItems];
        newOrderItems[index].quantity = quantity;
        setOrderItems(newOrderItems);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!customerInfo.name || !customerInfo.contact) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Calcular el precio total del pedido
        const totalPrice = orderItems.reduce((total, item) => {
            const dish = dishes.find(d => d._id === item.dishId);
            return total + (dish.price * item.quantity);
        }, 0);

        const order = {
            customer: userId,
            customerName: customerInfo.name,
            customerContact: customerInfo.contact,
            items: orderItems.map(item => ({ dishId: item.dishId, quantity: item.quantity })),
            totalPrice: totalPrice,
        };
        console.log(order)
        try {
            await handleOrderAPI(order);
            setOrderItems([]);
            setCustomerInfo({ name: '', contact: '' });
            setOrderSuccess(true);
            setError('');
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Error al enviar el pedido. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Hacer Pedido</h2>
            {orderSuccess && (
                <div className="text-green-500 mb-4">Pedido realizado con éxito.</div>
            )}

            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dishes.map(dish => (
                    <div key={dish._id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="text-lg font-bold">{dish.name}</h3>
                        <p>{dish.description}</p>
                        <p>Precio: {dish.price} €</p>
                        <button
                            onClick={() => handleAddToOrder(dish)}
                            className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600 transition duration-300"
                        >
                            Añadir al Pedido
                        </button>
                    </div>
                ))}
            </div>
            {orderItems.length > 0 && (
                <form onSubmit={handleOrderSubmit} className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Tu Pedido</h3>
                    {orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div>{item.name}</div>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleOrderChange(index, parseInt(e.target.value))}
                                className="w-16 px-2 py-1 border rounded"
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="contact">Contacto</label>
                        <input
                            type="text"
                            name="contact"
                            value={customerInfo.contact}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, contact: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        Realizar Pedido
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateOrderPage;

