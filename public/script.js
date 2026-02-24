const lista = document.getElementById("listaPedidos");
const form = document.getElementById("formPedido");
const loading = document.getElementById("loading");

async function carregarPedidos() {
  loading.style.display = "block";
  lista.innerHTML = "";

  const res = await fetch("/pedidos");
  const pedidos = await res.json();

  loading.style.display = "none";

  if (pedidos.length === 0) {
    lista.innerHTML = "<li>Nenhum pedido cadastrado.</li>";
    return;
  }

  pedidos.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>#${p.id}</strong> — ${p.cliente} • ${p.produto} (${p.quantidade})
      </span>
      <button onclick="deletarPedido(${p.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const produto = document.getElementById("produto").value;
  const quantidade = Number(document.getElementById("quantidade").value);

  await fetch("/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente, produto, quantidade }),
  });

  form.reset();
  carregarPedidos();
});

async function deletarPedido(id) {
  await fetch(`/pedidos/${id}`, { method: "DELETE" });
  carregarPedidos();
}

carregarPedidos();