'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getOrdersAPI } from '../api/order/order';
import { getDishesAPI } from '../api/dish/dish'; // Importa la función para obtener todos los platos

const OrderHistory = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dishDetails, setDishDetails] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchDishDetails(); // Obtener detalles de los platos al cargar la página
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersAPI();
      setOrders(response.data); // Actualiza orders con los datos obtenidos
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error al obtener el historial de pedidos. Por favor, inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  const fetchDishDetails = async () => {
    try {
      const response = await getDishesAPI(); // Obtener todos los platos
      const detailsMap = {};
      response.forEach(dish => {
        detailsMap[dish._id] = dish;
      });
      setDishDetails(detailsMap); // Almacena los detalles de los platos en el estado dishDetails
    } catch (error) {
      console.error('Error fetching dish details:', error);
    }
  };

  if (status === 'loading') return <div>Cargando...</div>;
  if (!session) return <div>Debes iniciar sesión para ver tu historial de pedidos.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Historial de Pedidos de {session.user.name}</h1>
      {loading ? (
        <div>Cargando historial de pedidos...</div>
      ) : (
        <div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {orders.length === 0 ? (
            <div>No hay historial de pedidos para mostrar.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-lg font-bold">ID de Orden: {order._id}</h3>
                  <p>Fecha del Pedido: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Precio Total: {order.totalPrice}</p>
                  <p>Estado: {order.status}</p>
                  <h4 className="text-lg font-bold mt-4">Platos Pedidos:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {dishDetails[item.dishId]?.name} - {dishDetails[item.dishId]?.price} €
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
