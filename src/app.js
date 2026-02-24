import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// "banco de dados" fake em memória
let pedidos = [];
let idAtual = 1;

app.get("/", (req, res) => {
  res.json({ status: "API de pedidos rodando 🚀" });
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

app.post("/pedidos", (req, res) => {
  const { cliente, produto, quantidade } = req.body;

  if (!cliente || !produto || !quantidade) {
    return res.status(400).json({
      erro: "cliente, produto e quantidade são obrigatórios",
    });
  }

  const novoPedido = {
    id: idAtual++,
    cliente,
    produto,
    quantidade,
    criadoEm: new Date(),
  };

  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

app.delete("/pedidos/:id", (req, res) => {
  const id = Number(req.params.id);
  pedidos = pedidos.filter((p) => p.id !== id);
  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});