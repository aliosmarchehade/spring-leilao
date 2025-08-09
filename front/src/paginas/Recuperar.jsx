import React, { useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";


const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();

  const handleRecuperar = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("fakeUsers")) || [];
    const existe = usuarios.find((u) => u.email === email);
    if (existe) {
      setMensagem("✅ Um link de recuperação foi enviado para seu e-mail.");
    } else {
      setMensagem("❌ E-mail não encontrado.");
    }
  };

  return (
    <div className="login-container">
      {/* Imagem lateral */}
      <div className="login-image-wrapper">
       
      </div>

      {/* Card de recuperação */}
      <div className="login-box recuperar-box">
        <h1 className="login-title">Recuperar Senha</h1>
        {mensagem && (
          <p
            className={mensagem.startsWith("✅") ? "success" : "error"}
            style={{ textAlign: "center" }}
          >
            {mensagem}
          </p>
        )}

        <form onSubmit={handleRecuperar}>
          <Input
            label="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <ButtonGroup>
            <button
              type="button"
              className="login-button cancel-button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button type="submit" className="login-button">
              Enviar Link
            </button>
          </ButtonGroup>
        </form>

        <div className="login-links">
          <p>
            <a href="/">Voltar para Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
