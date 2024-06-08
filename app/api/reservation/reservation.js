import axios from 'axios';

//const API = "http://localhost:8000/api";
const API = "https://aa-burger.vercel.app/api";

export const handleReservationAPI = (formData) => {
    return axios.post(`${API}/reservation`, formData)
        .then(response => {
            console.log('Datos enviados correctamente:', response.data)
            return response; // Devuelve el objeto de respuesta completo
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error)
            throw error; // Lanza el error para que se maneje en el bloque catch de la llamada
        });
};

// Obtener todas las reservas
export const getReservationsAPI = () => {
    return axios.get(`${API}/reservation`)
        .then(response => {
            console.log('Reservas obtenidas correctamente:', response.data);
            return response.data; // Devuelve los datos de la respuesta
        })
        .catch(error => {
            console.error('Error al obtener las reservas:', error);
            throw error;
        });
};

// Obtener una reserva por ID
export const getReservationByIdAPI = (id) => {
    return axios.get(`${API}/reservation/${id}`)
        .then(response => {
            console.log('Reserva obtenida correctamente:', response.data);
            return response.data; // Devuelve los datos de la respuesta
        })
        .catch(error => {
            console.error('Error al obtener la reserva:', error);
            throw error;
        });
};

// Actualizar una reserva
export const updateReservationAPI = (id, formData) => {
    return axios.put(`${API}/reservation/${id}`, formData)
        .then(response => {
            console.log('Reserva actualizada correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al actualizar la reserva:', error);
            throw error;
        });
};

// Eliminar una reserva
export const deleteReservationAPI = (id) => {
    return axios.delete(`${API}/reservation/${id}`)
        .then(response => {
            console.log('Reserva eliminada correctamente:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error al eliminar la reserva:', error);
            throw error;
        });
};
