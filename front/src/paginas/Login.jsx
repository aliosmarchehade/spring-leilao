import React, { useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import marteloLeilao from "../assets/leilao-martelo.png";
import carroLeilao from "../assets/carro.png";
import AutenticacaoService from "../services/AutenticacaoService";

const Login = () => {
  const autenticacaoService = new AutenticacaoService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await autenticacaoService.login(email, password);

      if (userData) {
        // Se o backend retornar token, salvar no localStorage
        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }

        // Você pode salvar os dados do usuário também, se precisar
        localStorage.setItem("usuario", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
  };

  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-container">
      <div className="login-image-wrapper">
        <img src={carroLeilao} alt="Martelo de Leilão" className="login-image" />
      </div>
      <div className="login-box">
        <h1 className="login-title">Leilão Online de Carros</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" className="login-button">
              Acessar
            </button>

            <button
              type="button"
              className="cadastro-button"
              onClick={handleCadastroClick}
            >
              Cadastre-se
            </button>
          </div>
        </form>

        <div className="login-links-ntc">
          <p>
            Não tem conta? <a href="/cadastro">Cadastre-se aqui</a>
          </p>
        </div>
        <div className="login-links">
          <p>
            <a href="/recuperar">Recuperar senha</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
