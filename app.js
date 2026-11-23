const equipamentos = [
  { nome: "Roteador de borda", identificador: "RB-01 · BORDA", tipo: "RB", latencia: "12 ms", situacao: "Estável", filtro: "estavel" },
  { nome: "Comutador administrativo", identificador: "CM-02 · ADMINISTRAÇÃO", tipo: "CM", latencia: "2 ms", situacao: "Estável", filtro: "estavel" },
  { nome: "Ponto de acesso", identificador: "PA-03 · LABORATÓRIO 01", tipo: "PA", latencia: "38 ms", situacao: "Atenção", filtro: "atencao" },
  { nome: "Servidor de arquivos", identificador: "SRV-04 · SERVIÇOS", tipo: "SV", latencia: "8 ms", situacao: "Estável", filtro: "estavel" }
];

const lista = document.querySelector("#lista-equipamentos");
const vazio = document.querySelector("#vazio");
const filtros = [...document.querySelectorAll(".filtro")];

function desenhar(filtro) {
  const visiveis = equipamentos.filter((equipamento) => filtro === "todos" || equipamento.filtro === filtro);
  lista.replaceChildren();
  for (const equipamento of visiveis) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-equipamento";
    const icone = document.createElement("span");
    icone.className = "icone-equipamento";
    icone.textContent = equipamento.tipo;
    const informacoes = document.createElement("div");
    informacoes.className = "info-equipamento";
    const nome = document.createElement("strong");
    nome.textContent = equipamento.nome;
    const identificador = document.createElement("span");
    identificador.className = "identificador-equipamento";
    identificador.textContent = equipamento.identificador;
    informacoes.append(nome, identificador);
    const metadados = document.createElement("div");
    metadados.className = "metadados-equipamento";
    const latencia = document.createElement("span");
    latencia.className = "latencia";
    latencia.textContent = equipamento.latencia;
    const situacao = document.createElement("span");
    situacao.className = `situacao${equipamento.filtro === "atencao" ? " atencao" : ""}`;
    situacao.textContent = equipamento.situacao;
    metadados.append(latencia, situacao);
    cartao.append(icone, informacoes, metadados);
    lista.append(cartao);
  }
  vazio.hidden = visiveis.length > 0;
  document.querySelector("#total").textContent = String(equipamentos.length).padStart(2, "0");
  document.querySelector("#estaveis").textContent = String(equipamentos.filter((equipamento) => equipamento.filtro === "estavel").length).padStart(2, "0");
  document.querySelector("#atencao").textContent = String(equipamentos.filter((equipamento) => equipamento.filtro === "atencao").length).padStart(2, "0");
  document.querySelector("#eventos").textContent = "01";
  for (const botao of filtros) {
    const ativo = botao.dataset.filtro === filtro;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  }
}

for (const botao of filtros) {
  botao.addEventListener("click", () => desenhar(botao.dataset.filtro));
}

desenhar("todos");

