import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import AuctionService from "../services/AuctionService";
import CategoryService from "../services/CategoriaService";
import { toast } from "react-toastify";
import "../css/auctionForm.css";

const AuctionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leilaoEdicao = location.state?.leilao;

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: leilaoEdicao?.id || null,
    title: leilaoEdicao?.title || "",
    description: leilaoEdicao?.description || "",
    startDateTime: leilaoEdicao?.startDateTime
      ? leilaoEdicao.startDateTime.replace(" ", "T").slice(0, 16)
      : "",
    endDateTime: leilaoEdicao?.endDateTime
      ? leilaoEdicao.endDateTime.replace(" ", "T").slice(0, 16)
      : "",
    status: leilaoEdicao?.status || "",
    observation: leilaoEdicao?.observation || "",
    incrementValue: leilaoEdicao?.incrementValue || 0,
    category: leilaoEdicao?.category?.id || "", // ← importante
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const res = await CategoryService.listar();
      setCategories(res.data.content);
    } catch (err) {
      toast.error("Erro ao carregar categorias");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!formData.title.trim()) {
      toast.error("Título é obrigatório!");
      return;
    }

    if (!formData.category) {
      toast.error("Selecione uma categoria!");
      return;
    }

    // ------ CONVERSÃO CORRETA PARA O BACK-END ------
    const auctionToSend = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      observation: formData.observation,
      status: formData.status,

      // converte datetime-local para ISO
      startDateTime: formData.startDateTime
        ? formData.startDateTime + ":00"
        : null,

      endDateTime: formData.endDateTime
        ? formData.endDateTime + ":00"
        : null,

      incrementValue: Number(formData.incrementValue),

      // Categoria precisa ser OBJETO
      category: {
        id: Number(formData.category),
      },
    };
    // ------------------------------------------------

    setLoading(true);

    try {
      if (formData.id) {
        await AuctionService.update(auctionToSend);
      } else {
        await AuctionService.insert(auctionToSend);
      }

      toast.success("Leilão salvo com sucesso!");
      navigate("/admin/leilao", { replace: true });

    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar leilão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auction-form-container">
      <Sidebar />

      <div className="auction-form-content">
        <button className="auction-form-btn-voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <h2 className="auction-form-title">
          {formData.id ? "Editar Leilão" : "Novo Leilão"}
        </h2>

        <div className="auction-form-grid">
          
          <div className="auction-form-field">
            <label>Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auction-form-field">
            <label>Descrição</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auction-form-field">
            <label>Data de Início *</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auction-form-field">
            <label>Data de Encerramento *</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auction-form-field">
            <label>Incremento</label>
            <input
              type="number"
              name="incrementValue"
              value={formData.incrementValue}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auction-form-field">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Selecione</option>
              <option value="ACTIVE">Ativo</option>
              <option value="CLOSED">Encerrado</option>
            </select>
          </div>

          <div className="auction-form-field">
            <label>Categoria *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Selecione</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="auction-form-field full">
            <label>Observação</label>
            <input
              type="text"
              name="observation"
              value={formData.observation}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <button
          className="auction-form-btn-save"
          onClick={handleSalvar}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
};

export default AuctionForm;
