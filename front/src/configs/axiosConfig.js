import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

api.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('usuario'));
        if (token) {
            config.headers.Authorization = `Bearer ${usuario.token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
export default api;