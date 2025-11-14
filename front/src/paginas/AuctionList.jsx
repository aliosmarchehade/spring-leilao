import React, { useEffect, useState } from "react";
import AuctionService from "../services/AuctionService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import { toast } from "react-toastify";
import "../css/auctionList.css";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarLeiloes();
  }, []);

  const carregarLeiloes = () => {
    AuctionService.list()
      .then((res) => {
        // Se sua API retorna direto uma lista:
        setAuctions(res);

        // Se retornar paginado:
        // setAuctions(res.data.content);
      })
      .catch(() => toast.error("Erro ao carregar leilões"));
  };

  const handleEditar = (leilao) => {
    navigate("/admin/carros/form", { state: { leilao } });
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir este leilão?")) {
      AuctionService.delete(id)
        .then(() => {
          toast.success("Leilão excluído com sucesso!");
          carregarLeiloes();
        })
        .catch(() => toast.error("Erro ao excluir leilão"));
    }
  };

  return (
    <div className="auction-container">
      <Sidebar />

      <div className="auction-content">
        <div className="auction-top-bar">
          <h2>Leilões</h2>

          <button
            onClick={() => navigate("/admin/carros/form")}
            className="btn-add"
          >
            + Novo Leilão
          </button>
        </div>

        <table className="auction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Status</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Incremento</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {auctions.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  Nenhum leilão encontrado
                </td>
              </tr>
            )}

            {auctions.map((auc) => (
              <tr key={auc.id}>
                <td>{auc.id}</td>
                <td>{auc.title}</td>
                <td>{auc.status}</td>
                <td>
                  {auc.startDateTime
                    ? new Date(auc.startDateTime).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td>
                  {auc.endDateTime
                    ? new Date(auc.endDateTime).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td>{auc.incrementValue}</td>

                <td>
                  <button className="btn-edit" onClick={() => handleEditar(auc)}>
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluir(auc.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionList;
