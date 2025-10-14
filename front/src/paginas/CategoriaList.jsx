import React, { useEffect, useState } from "react";
import CategoriaService from "../services/CategoriaService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import { toast } from "react-toastify";
import "../css/categoriaList.css";

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = () => {
    CategoriaService.listar()
      .then((res) => setCategorias(res.data.content))
      .catch(() => toast.error("Erro ao carregar categorias"));
  };

  const handleEditar = (categoria) => {
    navigate("/admin/categoria/form", { state: { categoria } });
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir esta categoria?")) {
      CategoriaService.excluir(id)
        .then(() => {
          toast.success("Categoria excluída com sucesso!");
          carregarCategorias();
        })
        .catch(() => toast.error("Erro ao excluir categoria"));
    }
  };

  return (
    <div className="categoria-container">
      <Sidebar />
      <div className="categoria-content">
        <div className="categoria-top-bar">
          <h2>Categorias</h2>
          <button
            onClick={() => navigate("/admin/categoria/form")}
            className="btn-add"
          >
            + Nova Categoria
          </button>
        </div>

        <table className="categoria-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Observação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">
                  Nenhuma categoria encontrada
                </td>
              </tr>
            )}
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nome}</td>
                <td>{cat.observacao || "-"}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditar(cat)}>
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluir(cat.id)}
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

export default CategoriaList;
