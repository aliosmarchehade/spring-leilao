import lamborg from "../assets/lambo.png";
import zenvo from "../assets/zenvo.png";
import koenig from "../assets/koenig.jpg";
import alfa from "../assets/ar.jpg";
import golf from "../assets/golfao.jpg";

const mockLeiloes = [
  {
    id: 1,
    veiculo: { nome: "Lamborghini Sián Roadster", imagemUrl: lamborg, categoria: "Supercarro" },
    lanceInicial: 2200000,
    compraImediata: 2464000,
    dataFim: "2025-09-30T23:00:00"
  },
  {
    id: 2,
    veiculo: { nome: "Zenvo ST1", imagemUrl: zenvo, categoria: "Supercarro" },
    lanceInicial: 4000000,
    compraImediata: 5243000,
    dataFim: "2025-09-30T23:59:00"
  },
  {
    id: 3,
    veiculo: { nome: "Koenigsegg Jesko", imagemUrl: koenig, categoria: "Supercarro" },
    lanceInicial: 1650000,
    compraImediata: 1900000,
    dataFim: "2025-10-01T23:59:00"
  },
  {
    id: 4,
    veiculo: { nome: "Golf GTI", imagemUrl: golf, categoria: "Hatch" },
    lanceInicial: 22000,
    compraImediata: 31000,
    dataFim: "2025-10-01T23:59:00"
  },
  {
    id: 5,
    veiculo: { nome: "Alfa Romeu Guilea", imagemUrl: alfa, categoria: "Sedan" },
    lanceInicial: 380000,
    compraImediata: 500000,
    dataFim: "2025-10-01T23:59:00"
  },
  
  
];

export default mockLeiloes;
