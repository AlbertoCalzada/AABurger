import axios from 'axios';

const API = "http://localhost:8000/api";

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
