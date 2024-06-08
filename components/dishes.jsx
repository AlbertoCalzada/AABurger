import React, { useState, useEffect } from 'react';
import { handleDishAPI, getDishesAPI, updateDishAPI, deleteDishAPI } from '../app/api/dish/dish';

const DishesManager = () => {
    const [dishes, setDishes] = useState([]);
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        description: '',
        price: 0,
        type: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false); 
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const data = await getDishesAPI();
            setDishes(data.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este plato?");
            if (confirmed) {
                await deleteDishAPI(id);
                setMessage('Plato eliminado correctamente.');
                fetchDishes(); 
            }
        } catch (error) {
            console.error('Error deleting dish:', error);
            setMessage('Error al eliminar el plato.');
        }
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            // Obtenemos el nombre del archivo seleccionado
            const fileName = e.target.files[0].name;
            // Actualizamos el estado con el nombre del archivo
            setFormData({ ...formData, [e.target.name]: fileName });
        } else {
            // Para otros campos, simplemente actualizamos el estado como antes
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDishAPI(editingId, formData);
                setMessage('Plato actualizado correctamente.');
            } else {
                await handleDishAPI(formData);
                setMessage('Plato creado correctamente.');
            }
            fetchDishes();
            setFormData({ image: null, name: '', description: '', price: 0, type: '' });
            setEditingId(null);
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error handling dish:', error);
            setMessage('Error al procesar el plato.');
        }
    };

    const handleEdit = (dish) => {
        setFormData({
            image: dish.image,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            type: dish.type
        });
        setEditingId(dish._id);
        setShowCreateForm(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Platos</h2>
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">{message}</div>}
            <button
                onClick={() => {
                    setEditingId(null);
                    setShowCreateForm(!showCreateForm);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded mb-2 hover:bg-green-600 transition duration-300"
            >
                {showCreateForm ? 'Cancelar Crear Nuevo Plato' : 'Crear Nuevo Plato'}
            </button>
            {showCreateForm && (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="image">Imagen (ruta)</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Imagen"
                            required
                        />
                    </div>
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
                        <label className="block text-gray-700 mb-1" htmlFor="description">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Descripción"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="price">Precio</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="type">Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="entrante">Entrante</option>
                            <option value="principal">Principal</option>
                            <option value="postre">Postre</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        {editingId ? 'Actualizar Plato' : 'Crear Plato'}
                    </button>
                </form>
            )}
            <ul className="mb-4">
                {dishes.map(dish => (
                    <li key={dish._id} className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
                        <div>
                            <div className="font-medium">Nombre: {dish.name}</div>
                            <div>Descripción: {dish.description}</div>
                            <div>Precio: {dish.price}</div>
                            <div>Tipo: {dish.type}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(dish)}
                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition duration-300"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(dish._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishesManager;

