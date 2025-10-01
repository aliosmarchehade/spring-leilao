import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Recuperar from "./paginas/Recuperar";

import { fakeUsers } from "./data/usuarios";
import Leiloes from "./paginas/Leiloes";

if (!localStorage.getItem("fakeUsers")) {
  localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/dashboard" element={<Leiloes />} />
        {/* <Route path="/dashboard" element={<div className='dashboard'>Bem-vindo ao sistema de leilão !!<br></br>
          <p>🚧página em construção🚧</p>
        </div>} /> */}
      </Routes>
    </Router>
  );
};

export default App;