import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Recuperar from "./paginas/Recuperar";
import Leiloes from "./paginas/Leiloes";
import RotaPrivadaLayout from "./components/layout/RotaPrivadaLayout";
import { fakeUsers } from "./data/usuarios";
import MinhaConta from "./paginas/MinhaConta";
import AdminVeiculos from "./paginas/AdminVeiculos"; 
import GenericRegisterLeilao from "./GenericRegister/GenericRegister"; 

if (!localStorage.getItem("fakeUsers")) {
  localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Rota privada */}
        <Route element={<RotaPrivadaLayout />}>
          <Route path="/dashboard" element={<Leiloes />} />
          <Route path="/conta" element={<MinhaConta/>} /> 
          <Route path="/admin/veiculos" element={<AdminVeiculos />} />
          <Route path="/admin/genericRegister" element={<GenericRegisterLeilao />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
