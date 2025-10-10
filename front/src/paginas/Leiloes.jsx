import whats from "../assets/whatsapp.jpg";
import mockLeiloes from "../mocks/mockLeiloes"; //
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Leiloes = () => {
  const [leiloes, setLeiloes] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("padrao");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/leiloes")
      .then(response => setLeiloes(response.data.content))
      .catch(() => {
        setLeiloes(mockLeiloes);
      });
  }, []);


  const handleMinhaConta = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    if (!usuario) {
      navigate("/login");
      return;
    }
  
    switch (usuario.tipoPerfil) {
      case "ADMIN":
        navigate("/admin/veiculos"); // nova página que você vai criar
        break;
      case "LEILOEIRO":
        navigate("/conta");
        break;
      default:
        navigate("/conta"); // ou outra página para comprador
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

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
  <header className="leiloes-header">
  <h1>Chehade Leilões</h1>

  <div className="dropdown">
    <button className="logout-button">Minha Conta ⌄</button>
    <div className="dropdown-content">
      <button onClick={handleMinhaConta}>Acessar Conta</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  </div>
</header>

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
