import whats from "../assets/whatsapp.jpg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/axiosConfig";

const Leiloes = () => {
  const [leiloes, setLeiloes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("padrao");
  const navigate = useNavigate();

  // Recupera usuário logado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Função para direcionar corretamente para conta
  const handleAcessarConta = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    if (usuario.email === "admin@example.com") {
      navigate("/admin/veiculos");
    } else {
      navigate("/conta");
    }
  };

  useEffect(() => {
    api
      .get("/leilao?page=0&size=50")
      .then((response) => setLeiloes(response.data.content || []))
      .catch((error) => {
        console.error("Erro ao buscar leilões:", error);
        setLeiloes([]);
      });

    api
      .get("/categoria?size=100")
      .then((res) => setCategorias(res.data.content || []))
      .catch(() => setCategorias([]));
  }, []);

  const todasCategorias = [
    { id: "Todos", nome: "Todas categorias" },
    ...categorias.map((c) => ({ id: c.nome, nome: c.nome })),
  ];

  const leiloesFiltrados = leiloes
    .filter((l) => l.title?.toLowerCase().includes(busca.toLowerCase()))
    .filter((l) =>
      categoria === "Todos" ? true : l.category?.nome === categoria
    )
    .sort((a, b) => {
      if (ordenacao === "data")
        return new Date(a.endDateTime) - new Date(b.endDateTime);
      return 0;
    });

  return (
    <div className="leiloes-container">
      <header className="leiloes-header">
        <h1>Chehade Leilões</h1>

        <div className="dropdown">
          <button className="logout-button">Minha Conta ⌄</button>
          <div className="dropdown-content">
            <button onClick={handleAcessarConta}>Acessar Conta</button>
            <button onClick={() => navigate("/login")}>Sair</button>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar leilão..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {todasCategorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="padrao">Ordenar por</option>
          <option value="data">Encerra antes</option>
        </select>
      </div>

      {/* Lista de Leilões */}
      <div className="leiloes-lista">
        {leiloesFiltrados.length === 0 ? (
          <p className="sem-resultados">Nenhum leilão encontrado 🚧</p>
        ) : (
          leiloesFiltrados.map((l) => (
            <div key={l.id} className="leilao-card">
              <img
                src={
                  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=600"
                }
                alt="Imagem do leilão"
              />

              <h2>{l.title}</h2>
              <p>Categoria: {l.category?.nome || "Não informada"}</p>
              <p>
                Início:{" "}
                {l.startDateTime
                  ? new Date(l.startDateTime).toLocaleString("pt-BR")
                  : "-"}
              </p>
              <p>
                Fim:{" "}
                {l.endDateTime
                  ? new Date(l.endDateTime).toLocaleString("pt-BR")
                  : "-"}
              </p>

              <p>Incremento: R$ {l.incrementValue}</p>
              <p>Status: {l.status}</p>

              <button onClick={() => navigate(`/leilao/${l.id}`)}>
              Ver Detalhes
            </button>
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
