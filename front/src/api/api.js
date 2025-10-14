import axios from "axios";

// Aqui você define a URL base do seu backend de leilão
// Pode ser via variável de ambiente ou diretamente:
const API_URL = process.env.REACT_APP_URL_BACK_END || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  timeout: 6000000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inclui o token (se existir) nos headers automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Exporta métodos padronizados
const Api = {
  get: async (route, params) => api.get(route, params),
  post: async (route, data, config) => api.post(route, data, config),
  put: async (route, data) => api.put(route, data),
  delete: async (route) => api.delete(route),
};

export default Api;
