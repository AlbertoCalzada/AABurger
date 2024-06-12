'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getOrdersAPI } from '../api/order/order';
import { getDishesAPI } from '../api/dish/dish'; 
const OrderHistory = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dishDetails, setDishDetails] = useState({});

  useEffect(() => {
    if (session) {
      fetchOrders();
      fetchDishDetails();
    }
  }, [session]); // Ejecuta el efecto cada vez que cambia la sesión

  const fetchOrders = async () => {
    try {
      const response = await getOrdersAPI();
      // Filtra los pedidos para mostrar solo los del usuario actual
      const userOrders = response.data.filter(order => order.customer === session.user.id);
      setOrders(userOrders);
      setLoading(false);
      setError(''); 
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error al obtener el historial de pedidos. Por favor, inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  const fetchDishDetails = async () => {
    try {
        const response = await getDishesAPI(); 
        const detailsMap = {};
        response.data.forEach(dish => {
            detailsMap[dish._id] = dish;
        });
        setDishDetails(detailsMap); 
        setLoading(false); 
    } catch (error) {
        console.error('Error fetching dish details:', error);
        setError('Error al obtener los detalles de los platos. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false); 
    }
};

  if (status === 'loading') return <div>Cargando...</div>;
  if (!session) return <div>Debes iniciar sesión para ver tu historial de pedidos.</div>;

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
  <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Historial de Pedidos de {session.user.name}</h1>
  {loading ? (
    <div className="text-center text-lg text-gray-600">Cargando historial de pedidos...</div>
  ) : (
    <div>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {orders.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No hay historial de pedidos para mostrar.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ID de Orden: {order._id}</h3>
              <p className="text-gray-600 mb-1"><strong>Fecha del Pedido:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-1"><strong>Precio Total:</strong> {order.totalPrice.toFixed(2)} €</p>
              <p className="text-gray-600 mb-1"><strong>Estado:</strong> {order.status}</p>
              <h4 className="text-lg font-bold mt-4 text-gray-800">Platos Pedidos:</h4>
              <ul className="list-disc list-inside ml-4 mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    <span className="font-medium">{item.quantity}x</span> {dishDetails[item.dishId]?.name} - {dishDetails[item.dishId]?.price.toFixed(2)} €
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>

  );
}; 

export default OrderHistory;
