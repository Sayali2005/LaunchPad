import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // points to deployed backend in production
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // needed if backend uses cookies
});

export default API;
