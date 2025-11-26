import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLeilao } from "../hooks/useLeilao";
import Api from "../configs/axiosConfig";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import "../css/detalhesLeilao.css";

const LeilaoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: leilao, isLoading } = useLeilao(id);

  const [showModal, setShowModal] = useState(false);
  const [valueBid, setValueBid] = useState("");
  const [bids, setBids] = useState([]);

  const stompClient = useRef(null);

  // =============================
  // 🔥 Conectar ao WebSocket
  // =============================
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Conectado ao WebSocket!");

      client.subscribe(`/topic/auction/${id}`, (message) => {
        const novoLance = JSON.parse(message.body);
        setBids((prev) => [novoLance, ...prev]); // adiciona no topo
      });
    };

    client.activate();
    stompClient.current = client;

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
  }, [id]);

  // =============================
  // 🔥 Carregar lances do backend
  // =============================
  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await Api.get(`/bids/auction/${id}`);
        setBids(resp.data);
      } catch (e) {
        console.error("Erro ao carregar lances", e);
      }
    };

    carregar();
  }, [id]);

  // =============================
  // Enviar lance 
  // =============================
  const enviarLance = async () => {

    if(leilao.status === "CLOSED"){
      alert("LEILÃO ENCERRADO - Não é mais possível enviar lances");
      return;
    }
    if (!valueBid) {
      alert("Digite um valor válido");
      return;
    }

  
    // Remove R$, espaços e pontos → transforma vírgula em ponto
    const numeric = Number(
      valueBid
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
  
    if (!numeric || numeric <= 0) {
      alert("Digite um valor válido");
      return;
    }
  
    // Pegando maior lance atual
  const maiorLance = bids.length > 0 ? bids[0].valueBid : 0;

  // Verificando incremento mínimo
  const incrementoMinimo = leilao.incrementValue || 1;

  if (numeric < maiorLance + incrementoMinimo) {
    alert(
      `Lance insuficiente!\n\n` +
      `➡ Lance atual: R$ ${maiorLance.toFixed(2)}\n` +
      `➡ Incremento mínimo: R$ ${incrementoMinimo.toFixed(2)}\n\n` +
      `Seu lance deve ser pelo menos R$ ${(maiorLance + incrementoMinimo).toFixed(2)}`
    );
    return;
  }

    try {
      const payload = {
        valueBid: numeric,
        auctionId: Number(id),
      };
  
      await Api.post("/bids", payload);
  
      setShowModal(false);
      setValueBid("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao enviar o lance");
    }
  };

  if (isLoading || !leilao) {
    return <p style={{ padding: 20 }}>Carregando detalhes...</p>;
  }

  return (
    <div className="detalhes-container">
      
      <button onClick={() => navigate(-1)} className="voltar-btn">← Voltar</button>

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

      {/* ====== BOTÃO DAR LANCE ====== */}
      <button className="botao-lance" onClick={() => setShowModal(true)}>
        Dar Lance
      </button>

      {/* ====== LISTA DE LANCES ====== */}
      <h2>Lances Recentes</h2>
      {bids.length === 0 && <p>Nenhum lance ainda.</p>}

      <ul className="lista-bids">
        {bids.map((b, index) => (
          <li key={index} className="item-bid">
            <strong>R$ {b.valueBid}</strong> — {b.userNome || b.userEmail}
            <br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              {new Date(b.dateTime).toLocaleString("pt-BR")}
            </span>
          </li>
        ))}
      </ul>

      {/* ====== MODAL ====== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Enviar Lance</h2>

        <input
          type="text"
          placeholder="Digite o valor do lance"
          value={valueBid}
          onChange={(e) => {
            let v = e.target.value;

            // remove tudo que não é número
            v = v.replace(/\D/g, "");

            if (v === "") {
              setValueBid("");
              return;
            }

            // transforma em centavos
            const valor = (Number(v) / 100).toFixed(2);

            // aplica máscara BRL
            const formatado = valor
              .replace(".", ",")              // troca ponto por vírgula
              .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // coloca pontos de milhar

            setValueBid(`R$ ${formatado}`);
          }}
          className="input-lance"
        />

            <button onClick={enviarLance} className="btn-confirmar">
              Enviar
            </button>

            <button onClick={() => setShowModal(false)} className="btn-cancelar">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeilaoDetalhes;
