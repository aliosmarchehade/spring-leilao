import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import CategoriaService from "../services/CategoriaService";
import { toast } from "react-toastify";
import "../css/categoriaForm.css";

const CategoriaForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoriaEdicao = location.state?.categoria;

  const [formData, setFormData] = useState({
    id: categoriaEdicao?.id || null,
    nome: categoriaEdicao?.nome || "",
    observacao: categoriaEdicao?.observacao || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Previne propagação de eventos

    if (!formData.nome.trim()) {
      toast.error("O campo nome é obrigatório");
      return;
    }

    setLoading(true);

    try {
      const action = formData.id
        ? CategoriaService.atualizar(formData)
        : CategoriaService.salvar(formData);

      await action;
      toast.success("Categoria salva com sucesso!");
      navigate("/admin/categoria", { replace: true });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      const mensagem = error.response?.data?.message || "Erro ao salvar categoria";
      toast.error(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categoria-form-container">
      <Sidebar />
      <div className="categoria-form-content">
        <button
          className="categoria-form-btn-voltar"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          ← Voltar
        </button>

        <h2 className="categoria-form-title">
          {formData.id ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <form
          className="categoria-form-generic-form"
          onSubmit={(e) => e.preventDefault()} // Previne submit padrão
        >
          <div className="categoria-form-field">
            <label>Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="categoria-form-field">
            <label>Observação</label>
            <input
              type="text"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button
            type="button"
            className="categoria-form-btn-save"
            onClick={handleSalvar}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;