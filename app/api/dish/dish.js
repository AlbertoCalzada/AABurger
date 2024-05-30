import axios from 'axios';

//const API = "http://localhost:8000/api";
const API = "https://restaurant-app-blush-kappa.vercel.app/api";
// Crear 
export const handleDishAPI = (formData) => {
    return axios.post(`${API}/dish`, formData)
        .then(response => {
            console.log('Datos del plato enviados correctamente:', response.data);
            return response; // Devuelve el objeto de respuesta completo
        })
        .catch(error => {
            console.error('Error al enviar los datos del plato:', error);
            throw error; // Lanza el error para que se maneje en el bloque catch de la llamada
        });
};

// Obtener todos 
export const getDishesAPI = () => {
    return axios.get(`${API}/dish`)
        .then(response => {
            console.log('Platos obtenidos correctamente:', response.data);
            return response.data; // Devuelve los datos de la respuesta
        })
        .catch(error => {
            console.error('Error al obtener los platos:', error);
            throw error;
        });
};

// Obtener un plato 
export const getDishByIdAPI = (id) => {
    return axios.get(`${API}/dish/${id}`)
        .then(response => {
            console.log('Plato obtenido correctamente:', response.data);
            return response.data; // Devuelve los datos de la respuesta
        })
        .catch(error => {
            console.error('Error al obtener el plato:', error);
            throw error;
        });
};

// Actualizar un plato 
export const updateDishAPI = (id, formData) => {
    return axios.put(`${API}/dish/${id}`, formData)
        .then(response => {
            console.log('Plato actualizado correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al actualizar el plato:', error);
            throw error;
        });
};

// Eliminar un plato 
export const deleteDishAPI = (id) => {
    return axios.delete(`${API}/dish/${id}`)
        .then(response => {
            console.log('Plato eliminado correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al eliminar el plato:', error);
            throw error;
        });
};
