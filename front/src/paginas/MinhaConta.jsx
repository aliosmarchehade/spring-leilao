import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/minhaconta.css";

const MinhaConta = () => {
  const [usuario, setUsuario] = useState(null);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsuario(storedUser);
      fetchLogs(storedUser.id);
    }
  }, [navigate]);

  const fetchLogs = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/logs/usuario/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (!usuario) return null;

  return (
    <div className="minha-conta-page">
      <div className="botaovoltar">
        <button onClick={() => navigate(-1)}>← Voltar</button>
      </div>

      <div className="minha-conta-container">
        <h1>Minha Conta</h1>
        <div className="usuario-info">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>

        <div className="conta-actions">
          <button onClick={handleLogout}>Sair</button>
        </div>

        <div className="logs-container">
          <h2>Histórico de Ações</h2>
          {logs.length > 0 ? (
            <ul className="logs-list">
              {logs.map((log, index) => (
                <li key={index}>
                  <span>{new Date(log.dataHora).toLocaleString()}</span> — {log.acao}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma ação registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinhaConta;
