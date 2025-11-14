import axios from "axios";

const API_URL = "http://localhost:8080/leilao";

const AuctionService = {
  list: (page = 0, size = 10) =>
    axios.get(`${API_URL}?page=${page}&size=${size}`)
      .then(res => res.data.content), // <-- AQUI É A CHAVE

  buscarPorId: (id) => axios.get(`${API_URL}/${id}`),

  insert: (auction) => axios.post(API_URL, auction),

  update: (auction) => axios.put(`${API_URL}`, auction),

  delete: (id) => axios.delete(`${API_URL}/${id}`),
};

export default AuctionService;
