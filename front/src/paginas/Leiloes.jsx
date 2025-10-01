import lamborg from "../assets/lambo.png";
import zenvo from "../assets/zenvo.png";
import koenig from "../assets/koenig.jpg"
import alfa from "../assets/ar.jpg"
import golf from "../assets/golfao.jpg"
import React, { useEffect, useState } from "react";
import axios from "axios";

const mockLeiloes = [
    {
      id: 1,
      veiculo: { nome: "Lamborghini Sián Roadster", imagemUrl: lamborg },
      lanceInicial: 2200000,
      compraImediata: 2464000,
      dataFim: "2025-09-30T23:00:00"
    },
    {
      id: 2,
      veiculo: { nome: "Zenvo ST1", imagemUrl: zenvo },
      lanceInicial: 4000000,
      compraImediata: 5243000,
      dataFim: "2025-09-30T23:59:00"
    },
    {
        id: 3,
        veiculo: { nome: "Koenigsegg Jesko ", imagemUrl: koenig },
        lanceInicial: 1650000,
        compraImediata: 1900000,
        dataFim: "2025-10-01T23:59:00"
      },
      {
        id: 4,
        veiculo: { nome: "Golf GTI ", imagemUrl: golf },
        lanceInicial: 22000,
        compraImediata: 31000,
        dataFim: "2025-10-01T23:59:00"
      },
      {
        id: 5,
        veiculo: { nome: "Alfa Romeu Guilea", imagemUrl: alfa },
        lanceInicial: 380000,
        compraImediata: 500000,
        dataFim: "2025-10-01T23:59:00"
      }
  ];

const Leiloes = () => {
  const [leiloes, setLeiloes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/leiloes")
      .then(response => setLeiloes(response.data.content))
      .catch(() => {
        // se não conseguir pegar do backend, usa mock
        setLeiloes(mockLeiloes);
      });
  }, []);

  return (
    
    <div className="leiloes-container">
      <h1>Chehade Leilões</h1>
      <div className="leiloes-lista">
        {leiloes.map((leilao) => (
          <div key={leilao.id} className="leilao-card">
            <img
              src={leilao.veiculo?.imagemUrl || "/placeholder.jpg"}
              alt={leilao.veiculo?.nome}
            />
            <h2>{leilao.veiculo?.nome}</h2>
            <p>Lance inicial: R$ {leilao.lanceInicial.toLocaleString()} </p>
            <p>Compra imediata: R$ {leilao.compraImediata.toLocaleString()}</p>
            <p>Termina em: {new Date(leilao.dataFim).toLocaleString()}</p>
            <button>Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leiloes;
