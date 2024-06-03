// pages/CreateOrderPage.jsx
'use client'
// pages/createOrder.jsx
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import MenuOrder from '../../components/menuOrder';
import { handleOrderAPI } from '../api/order/order';

const CreateOrder = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [orderItems, setOrderItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [orderItems]);

    const handleOrderSubmit = async () => {
        if (orderItems.length === 0) {
            setSubmissionError('Debe agregar al menos un artículo al pedido.');
            return;
        }

        if (!userId) {
            setSubmissionError('Debe estar registrado para realizar un pedido.');
            return;
        }

        const orderData = {
            customer: userId,
            customerName,
            customerContact,
            items: orderItems.map(item => ({
                dishId: item.dishId,
                quantity: item.quantity
            })),
            totalPrice
        };

        try {
            setIsSubmitting(true);
            await handleOrderAPI(orderData);
            alert('Pedido realizado con éxito.');
            setOrderItems([]);
            setCustomerName('');
            setCustomerContact('');
            setSubmissionError('');
        } catch (error) {
            setSubmissionError('Hubo un error al realizar el pedido. Por favor, inténtelo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">Crear Pedido</h1>
            <div className="mb-8">
                <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    placeholder="Nombre del Cliente"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    placeholder="Contacto del Cliente"
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    required
                />
            </div>
            <MenuOrder orderItems={orderItems} setOrderItems={setOrderItems} />
            {submissionError && <p className="text-red-500 text-center mb-4">{submissionError}</p>}
            <div className="text-center mb-4">
                <p className="text-lg font-bold">Precio Total: {totalPrice.toFixed(2)} €</p>
            </div>
            <div className="text-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleOrderSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enviando...' : 'Realizar Pedido'}
                </button>
            </div>
        </div>
    );
};

export default CreateOrder;
