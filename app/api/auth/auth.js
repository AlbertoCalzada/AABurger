import axios from 'axios'

const API = "http://localhost:8000/api";

export const registerRequest = user => axios.post(`${API}/register`, user)

export const loginRequest = user => axios.post(`${API}/login`, user)

export const getUser = async (userId) => {
    try {
      const response = await axios.get(`${API}/user/${userId}`);
      return response.data; 
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message);
    }
  };