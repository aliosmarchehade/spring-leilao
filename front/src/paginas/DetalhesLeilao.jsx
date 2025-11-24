import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLeilao } from "../hooks/useLeilao";
import "../css/detalhesLeilao.css";

const LeilaoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: leilao, isLoading } = useLeilao(id);

  if (isLoading || !leilao) {
    return <p style={{ padding: 20 }}>Carregando detalhes...</p>;
  }

  return (
    <div className="detalhes-container">
      <button onClick={() => navigate(-1)} className="voltar-btn">
        ← Voltar
      </button>

      <img
        className="detalhes-imagem"
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=900"
        alt="Imagem do leilão"
      />

      <h1>{leilao.title}</h1>

      <p><strong>Descrição:</strong> {leilao.description}</p>
      <p><strong>Categoria:</strong> {leilao.category?.nome || "Sem categoria"}</p>
      <p><strong>Status:</strong> {leilao.status}</p>
      <p><strong>Início:</strong> {new Date(leilao.startDateTime).toLocaleString("pt-BR")}</p>
      <p><strong>Fim:</strong> {new Date(leilao.endDateTime).toLocaleString("pt-BR")}</p>
      <p><strong>Incremento mínimo:</strong> R$ {leilao.incrementValue}</p>
    </div>
  );
};

export default LeilaoDetalhes;
