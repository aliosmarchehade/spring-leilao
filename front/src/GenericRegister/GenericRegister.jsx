import { ArrowLeft, X, Check } from "lucide-react";
import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../api/api"; 
import "./GenericRegister.css";

export default function GenericRegisterLeilao({
  pageName = "001 - Cadastro Genérico",
  pageTitle = "Cadastro Genérico",
  labelNameForm = "Nome",
  backRouter = "/admin/",
  name = "Registro",
  onSalvar = () => console.log("Salvar"),
  onEdit = () => console.log("Editar"),
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Dados vindos via location.state (quando for edição)
  const {
    pageName: statePageName,
    pageTitle: statePageTitle,
    labelNameForm: stateLabelNameForm,
    initialData: stateInitialData,
    id: stateId,
    routeEdit: stateRouteEdit,
  } = location.state || {};

  const [formData, setFormData] = useState({
    name: stateInitialData?.name || "",
    status: stateInitialData?.status || "active",
  });

  const [errors, setErrors] = useState({});
  const [inputKey, setInputKey] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFields = () => {
    setInputKey((prev) => prev + 1);
    if (stateId) {
      setFormData({
        name: stateInitialData?.name || "",
        status: stateInitialData?.status || "active",
      });
    } else {
      setFormData({
        name: "",
        status: "active",
      });
    }
  };

  const validateForm = () => {
    let erros = {};
    if (formData.name.trim() === "") {
      erros.name = "Campo nome é obrigatório";
    }
    if (formData.status.trim() === "") {
      erros.status = "Campo status é obrigatório";
    }
    if (Object.keys(erros).length > 0) {
      setErrors(erros);
      return false;
    }
    return true;
  };

  const validateAndSave = async () => {
    if (!validateForm()) return;

    try {
      if (stateId) {
        // Atualização
        const result = await Api.put(`${stateRouteEdit}/${stateId}`, formData);
        if (result.status === 200) {
          toast.success(`${name} atualizado com sucesso!`);
          navigate(backRouter);
        } else {
          toast.error(`Erro ao atualizar ${name}.`);
        }
      } else {
        // Novo registro
        const result = await Api.post(backRouter, formData);
        if (result.status === 201 || result.status === 200) {
          toast.success(`${name} salvo com sucesso!`);
          navigate(backRouter);
        } else {
          toast.error(`Erro ao salvar ${name}.`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`Falha ao salvar ${name}.`);
    }
  };

  return (
    <main style={{ position: "relative", padding: "20px", zIndex: 20000 }} className="w-full">
      <section className="header-cad w-full">
        <h3 className="text-header">{statePageName || pageName}</h3>
        <br />
      </section>

      <section className="title-page">
        <div style={{ padding: "20px" }}>
          <h1 className="title">{statePageTitle || pageTitle}</h1>
        </div>
      </section>

      <section className="content-cad">
        <div className="back-list">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="black" />
            <p>Voltar para listagem</p>
          </button>
        </div>

        <form className="generic-form">
          <div>
            <label className="label-form">{stateLabelNameForm || labelNameForm}</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`generic-form-input ${errors.name ? "border-red" : ""}`}
              value={formData.name}
              onChange={handleInputChange}
              key={inputKey}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <section className="radios">
            <p className="label-radio">
              Status <span className="required">*</span>
            </p>
            <div className="radio-buttons">
              <RadioButton
                inputId="statusActive"
                name="status"
                value="active"
                onChange={handleInputChange}
                checked={formData.status === "active"}
              />
              <label htmlFor="statusActive">Ativo</label>

              <RadioButton
                inputId="statusDeactivated"
                name="status"
                value="deactive"
                onChange={handleInputChange}
                checked={formData.status === "deactive"}
              />
              <label htmlFor="statusDeactivated">Desativado</label>
            </div>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </section>
        </form>

        <div className="form-action">
          <p>
            Os campos marcados com <span className="required">*</span> são obrigatórios
          </p>

          <div className="btn">
            <Button className="btn-generic btn-clean" onClick={handleClearFields}>
              <TrashIcon size={20} weight="fill" color="white" />
              Limpar Campos
            </Button>

            <NavLink to={backRouter} className="btn-generic btn-cancel">
              <X size={20} weight="fill" color="white" />
              Cancelar
            </NavLink>

            <Button className="btn-generic btn-save" onClick={validateAndSave}>
              <Check size={20} weight="fill" color="white" />
              Salvar
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
