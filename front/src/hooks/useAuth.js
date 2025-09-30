import AutenticacaoService from "../services/AutenticacaoService";

export const useAuth = () => {
  const autenticacaoService = new AutenticacaoService();

  const login = async (email, senha) => {
    const user = await autenticacaoService.login(email, senha);
    return user;
  };

  const register = async (nome, email, senha) => {
    try {
      const response = await autenticacaoService.register(nome, email, senha);
      return response; // retorna o usuário salvo
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return null;
    }
  };

  return { login, register };
};
