import axios from 'axios';

const API = "http://localhost:8000/api";

export const handleReservationAPI = (formData) => {
    axios.post(`${API}/reservation`, formData)
        .then(response => {
            console.log('Datos enviados correctamente:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });
};
