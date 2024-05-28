import axios from 'axios'

//const API = "http://localhost:8000/api";
const API = "https://restaurant-app-blush-kappa.vercel.app/api";

export const registerRequest = user => axios.post(`${API}/register`, user)

export const loginRequest = user => axios.post(`${API}/login`, user)

export const getUser = id => axios.get(`${API}/user/${id}`);
    