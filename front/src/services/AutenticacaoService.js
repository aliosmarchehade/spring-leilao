// services/AutenticacaoService.js
import axios from "axios";

export default class AutenticacaoService {
  async login(email, senha) {
    try {
      const response = await axios.post("http://localhost:8080/autenticacao/login", {
        email,
        senha,
      });
      return response.data; // Isso será o PessoaAutenticacaoDTO
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      return null;
    }
  }
}
