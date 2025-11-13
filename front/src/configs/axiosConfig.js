import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080", // fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const usuario = JSON.parse(localStorage.getItem('usuario')); // 👈 nome certo
    if (usuario?.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`; // 👈 variável certa
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 👇 trata token expirado ou inválido
    if (error.response && error.response.status === 401) {
      console.warn("Token expirado. Redirecionando para login...");
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
