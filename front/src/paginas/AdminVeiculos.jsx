import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import AuctionService from "../services/AuctionService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../css/admin.css";

const AdminVeiculos = () => {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const leiloes = await AuctionService.list();

      const agrupado = {};
      leiloes.forEach((l) => {
        const cat = l.category?.nome || "Sem Categoria";
        agrupado[cat] = (agrupado[cat] || 0) + 1;
      });

      const formatoGrafico = Object.entries(agrupado).map(([nome, total]) => ({
        categoria: nome,
        total,
      }));

      setChartData(formatoGrafico);
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
      

        <h2>Visão Geral dos Leilões</h2>

        {chartData.length === 0 ? (
          <p className="no-chart-data">Nenhum dado disponível para gerar o gráfico.</p>
        ) : (
          <div className="chart-card">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#861570" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVeiculos;
