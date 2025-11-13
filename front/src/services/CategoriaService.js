import axios from "axios";

const API_URL = "http://localhost:8080/categoria"; // ajuste a URL se necessário  

const CategoriaService = {
  listar: (page = 0, size = 10) => axios.get(`${API_URL}?page=${page}&size=${size}`),
  buscarPorId: (id) => axios.get(`${API_URL}/${id}`),
  salvar: (categoria) => axios.post(API_URL, categoria),
  // atualizar: (categoria) => axios.put(API_URL, categoria),
  atualizar: (categoria) => axios.put(`${API_URL}/${categoria.id}`, categoria),
  excluir: (id) => axios.delete(`${API_URL}/${id}`)
};

export default CategoriaService;
