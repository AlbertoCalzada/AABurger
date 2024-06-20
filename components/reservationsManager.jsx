import React, { useState, useEffect } from 'react';
import { handleReservationAPI, getReservationsAPI, updateReservationAPI, deleteReservationAPI } from '../app/api/reservation/reservation';

const ReservationsManager = () => {
    const [reservas, setReservas] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        peopleCount: 1,
        phone: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const data = await getReservationsAPI();
            const sortedReservas = data.data.sort((a, b) => new Date(a.date) - new Date(b.date)); //para ordenar y ver mejor las reservas
            setReservas(sortedReservas);
        } catch (error) {
            console.error('Error fetching reservas:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta reserva?");
            if (confirmed) {
                await deleteReservationAPI(id);
                fetchReservas(); // Refresh the list
                setMessage("Reserva eliminada correctamente.");
            }
        } catch (error) {
            console.error('Error deleting reserva:', error);
            setMessage("Error al eliminar la reserva.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateReservationAPI(editingId, formData);
                setMessage("Reserva actualizada correctamente.");
            } else {
                await handleReservationAPI(formData);
                setMessage("Reserva creada correctamente.");
            }
            fetchReservas();
            setFormData({ name: '', date: '', time: '', peopleCount: 1, phone: '' });
            setEditingId(null);
        } catch (error) {
            console.error('Error handling reserva:', error);
            setMessage("Error al procesar la reserva.");
        }
    };

    const handleEdit = (reserva) => {
        const formattedDate = new Date(reserva.date).toISOString().split('T')[0];
        setFormData({
            name: reserva.name,
            date: formattedDate,
            time: reserva.time,
            peopleCount: reserva.peopleCount,
            phone: reserva.phone
        });
        setEditingId(reserva._id);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Reservas</h2>
            {message && (
                <div className={`text-white p-3 rounded ${message.startsWith("Error") ? 'bg-red-500' : 'bg-green-500'}`}>
                    {message}
                </div>
            )}
            <ul className="mb-4">
                {reservas.map(reserva => (
                    <li key={reserva._id} className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
                        <div>
                            <div className="font-medium">Nombre: {reserva.name}</div>
                            <div>Fecha: {formatDate(reserva.date)}</div>
                            <div>Hora: {reserva.time}</div>
                            <div>Número de personas: {reserva.peopleCount}</div>
                            <div>Información de contacto: {reserva.phone}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(reserva)}
                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition duration-300"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(reserva._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingId && (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="date">Fecha</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="time">Hora</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="peopleCount">Número de personas</label>
                        <input
                            type="number"
                            name="peopleCount"
                            value={formData.peopleCount}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="phone">Información de contacto</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Información de contacto"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        Actualizar Reserva
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReservationsManager;
