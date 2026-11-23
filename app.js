const devices = [
  { name: "Gateway principal", id: "GW-01 · BORDA", kind: "RT", latency: "12 ms", state: "Estável", filter: "stable" },
  { name: "Switch administrativo", id: "SW-02 · ADMIN", kind: "SW", latency: "2 ms", state: "Estável", filter: "stable" },
  { name: "Ponto de acesso", id: "AP-03 · LAB 01", kind: "AP", latency: "38 ms", state: "Atenção", filter: "attention" },
  { name: "Servidor de arquivos", id: "SRV-04 · SERVIÇOS", kind: "SV", latency: "8 ms", state: "Estável", filter: "stable" }
];

const list = document.querySelector("#device-list");
const empty = document.querySelector("#empty");
const filters = [...document.querySelectorAll(".filter")];

function render(filter) {
  const visible = devices.filter((device) => filter === "all" || device.filter === filter);
  list.replaceChildren();
  for (const device of visible) {
    const card = document.createElement("article");
    card.className = "device-card";
    const icon = document.createElement("span");
    icon.className = "device-icon";
    icon.textContent = device.kind;
    const info = document.createElement("div");
    info.className = "device-info";
    const name = document.createElement("strong");
    name.textContent = device.name;
    const id = document.createElement("span");
    id.className = "device-id";
    id.textContent = device.id;
    info.append(name, id);
    const meta = document.createElement("div");
    meta.className = "device-meta";
    const latency = document.createElement("span");
    latency.className = "latency";
    latency.textContent = device.latency;
    const state = document.createElement("span");
    state.className = `state${device.filter === "attention" ? " attention" : ""}`;
    state.textContent = device.state;
    meta.append(latency, state);
    card.append(icon, info, meta);
    list.append(card);
  }
  empty.hidden = visible.length > 0;
  document.querySelector("#total").textContent = String(devices.length).padStart(2, "0");
  document.querySelector("#stable").textContent = String(devices.filter((device) => device.filter === "stable").length).padStart(2, "0");
  document.querySelector("#attention").textContent = String(devices.filter((device) => device.filter === "attention").length).padStart(2, "0");
  document.querySelector("#events").textContent = "01";
  for (const button of filters) {
    const active = button.dataset.filter === filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

for (const button of filters) {
  button.addEventListener("click", () => render(button.dataset.filter));
}

render("all");
