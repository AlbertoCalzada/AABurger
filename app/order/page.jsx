'use client'
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
    const [orderSuccessMessage, setOrderSuccessMessage] = useState('');

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [orderItems]);

    const handleOrderSubmit = async () => {
        if (!customerName.trim() || !customerContact.trim()) {
            setSubmissionError('Por favor, complete todos los campos.');
            return;
        }

        if (orderItems.some(item => item.quantity <= 0)) {
            setSubmissionError('La cantidad de todos los artículos debe ser mayor que cero.');
            return;
        }

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
            setOrderSuccessMessage('Pedido realizado con éxito.');
            setOrderItems([]);
            const resetOrderItems = orderItems.map(item => ({ ...item, quantity: 0 }));
            setOrderItems(resetOrderItems);
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
        <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
            <div className="container mx-auto px-4 py-8 " >
                <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">Crear Pedido</h1>
                <div className="mb-8">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Datos de entrega:</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-2 bg-gray-100 bg-opacity-50 rounded border"
                        placeholder="Nombre"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="w-full p-2 mb-2 bg-gray-100 bg-opacity-50 rounded border"
                        placeholder="Dirección"
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
                        className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg mt-2"
                        onClick={handleOrderSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Realizar Pedido'}
                    </button>
                </div>
                <br />
                {orderSuccessMessage && <p className="text-green-600 text-center mb-4">{orderSuccessMessage}</p>}

            </div>
        </section>
    );
};

export default CreateOrder;
