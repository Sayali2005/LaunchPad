// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:5000/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if using cookies
});

export default API;
