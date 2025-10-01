import whats from "../assets/whatsapp.jpg";
import mockLeiloes from "../mocks/mockLeiloes"; //
import React, { useEffect, useState } from "react";
import axios from "axios";


const Leiloes = () => {
  const [leiloes, setLeiloes] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("padrao");

  useEffect(() => {
    axios.get("http://localhost:8080/leiloes")
      .then(response => setLeiloes(response.data.content))
      .catch(() => {
        setLeiloes(mockLeiloes);
      });
  }, []);

  // aplica filtros e ordenação
  const leiloesFiltrados = leiloes
    .filter(leilao =>
      leilao.veiculo?.nome.toLowerCase().includes(busca.toLowerCase())
    )
    .filter(leilao =>
      categoria === "Todos" ? true : leilao.veiculo?.categoria === categoria
    )
    .sort((a, b) => {
      if (ordenacao === "preco") return a.lanceInicial - b.lanceInicial;
      if (ordenacao === "data") return new Date(a.dataFim) - new Date(b.dataFim);
      return 0;
    });

  return (
    <div className="leiloes-container">
      <h1>Chehade Leilões</h1>

      {/* filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar veículo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Todos">Todas categorias</option>
          <option value="Supercarro">Supercarro</option>
          <option value="Hatch">Hatch</option>
          <option value="Sedan">Sedan</option>
        </select>
        <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
          <option value="padrao">Ordenar por</option>
          <option value="preco">Menor preço inicial</option>
          <option value="data">Termina antes</option>
        </select>
      </div>

      {/* lista */}
      <div className="leiloes-lista">
        {leiloesFiltrados.length === 0 ? (
          <p className="sem-resultados">Nenhum leilão encontrado 🚧</p>
        ) : (
          leiloesFiltrados.map((leilao) => (
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
          ))
        )}
      </div>
      <a
  href="https://wa.me/5544998705279"
  className="whatsapp-button"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src={whats} alt="WhatsApp" />
</a>
    </div>
    
  );
  
};

export default Leiloes;
