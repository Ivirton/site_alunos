const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const alunoRoutes = require("./routes/alunoRoutes");
const escolaRoutes = require("./routes/escolaRoutes");
const cartaoRespostaRoutes = require("./routes/cartaoRespostaRoutes");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// Rotas principais
app.use("/alunos", alunoRoutes);
// app.use("/escolas", escolaRoutes);
// app.use("/cartao", cartaoRespostaRoutes);

app.get("/", (req, res) => {
  res.render("index", { title: "Sistema de Correção" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
