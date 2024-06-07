import axios from 'axios';

const API = "http://localhost:8000/api";

// Crear 
export const handleOrderAPI = (formData) => {
    return axios.post(`${API}/order`, formData)
        .then(response => {
            console.log('Datos de la orden enviados correctamente:', response.data);
            return response; 
        })
        .catch(error => {
            console.error('Error al enviar los datos de la orden:', error);
            throw error; 
        });
};

// Obtener todas 
export const getOrdersAPI = () => {
    return axios.get(`${API}/order`)
        .then(response => {
            console.log('Órdenes obtenidas correctamente:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error al obtener las órdenes:', error);
            throw error;
        });
};

// Obtener una
export const getOrderByIdAPI = (id) => {
    return axios.get(`${API}/order/${id}`)
        .then(response => {
            console.log('Orden obtenida correctamente:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error al obtener la orden:', error);
            throw error;
        });
};

// Actualizar 
export const updateOrderAPI = (id, formData) => {
    return axios.put(`${API}/order/${id}`, formData)
        .then(response => {
            console.log('Orden actualizada correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al actualizar la orden:', error);
            throw error;
        });
};

// Eliminar 
export const deleteOrderAPI = (id) => {
    return axios.delete(`${API}/order/${id}`)
        .then(response => {
            console.log('Orden eliminada correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al eliminar la orden:', error);
            throw error;
        });
};
