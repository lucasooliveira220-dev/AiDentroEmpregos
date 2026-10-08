const fs = require("fs");

const cargos = [
  "Analista de Atendimento",
  "Auxiliar Administrativo",
  "Assistente de Logística",
  "Operador de Produção",
  "Designer UX",
  "Desenvolvedor Full Stack",
  "Analista de Dados",
  "Enfermeiro(a)",
  "Contador(a)",
  "Cozinheiro(a)",
  "Atendimento",
  "Cuidador(a)"
];

const cidades = [
  "São paulo - SP",
  "Rio de Janeiro - RJ",
  "Guarulhos - SP",
  "Santos - SP",
  "São Vicente - SP",
  "Pintópolis - MG",
  "Anta Gorda - SP",
  "Pindamonhangaba - SP",
  "Pomerode - SC"
];

const empresas = [
  "Horizonte Soluções",
  "NexaTech",
  "Grupo Vale Verde",
  "PontoCerto Logística",
  "Nova Era Serviços",
  "Conecta Brasil",
  "Alvorada Alimentos",
  "Vértice Consultoria",
  "Prisma Saúde",
  "Rota Sul Transportes",
  "MaisWork",
  "InovaLar",
  "LulaMais"
];

const tipos = ["CLT", "PJ", "Estágio", "Temporário"];
const tempo = ["Tempo Integral", "Noturno"];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const vagas = Array.from({ length: 30 }, (_, i) => {
  const salarioBase = 2000 + Math.floor(Math.random() * 12) * 1000;

  return {
    id: i + 1,
    cargo: rand(cargos),
    cidade: rand(cidades),
    empresa: rand(empresas),
    tipo: rand(tipos),
    tempo: rand(tempo),
    salario: salarioBase,
    publicadaEm: new Date(Date.now() - Math.random() * 30 * 86400000)
      .toISOString()
      .split("T")[0]
  };
});

fs.writeFileSync("vagas.json", JSON.stringify(vagas, null, 2));
console.log("vagas.json gerado com", vagas.length, "vagas");