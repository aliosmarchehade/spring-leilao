import React, { useState } from "react";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import marteloLeilao from "../assets/leilao-martelo.png";
import AutenticacaoService from "../services/AutenticacaoService";

const Login = () => {
  const autenticacaoService = new AutenticacaoService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      navigate("/dashboard");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };


  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-container">
     
      <div className="login-image-wrapper">
        <img src={marteloLeilao} alt="Martelo de Leilão" className="login-image" />
      </div>
      <div className="login-box">
        <h1 className="login-title">Leilão Online</h1>
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

            <button type="button" className="cadastro-button" onClick={handleCadastroClick}>
              Cadastre-se
            </button>
          </div>
        </form>
  
        <div className="login-links-ntc">
          <p>
            Não tem conta?{' '}
            <a href="/cadastro"></a>
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