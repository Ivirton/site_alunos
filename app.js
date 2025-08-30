const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const alunoRoutes = require("./routes/alunoRoutes");
const escolaRoutes = require("./routes/escolaRoutes");
const homeRoutes = require("./routes/homeRoutes");  


// const cartaoRespostaRoutes = require("./routes/cartaoRespostaRoutes");


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// Rotas principais
app.use("/alunos", alunoRoutes);
app.use("/escolas", escolaRoutes);
app.use("/", homeRoutes);  // Adiciona a rota do dashboard

app.use("/sobre", (req, res) => {
  res.render("sobre");
})

// app.use("/cartao", cartaoRespostaRoutes);
//Pasta do vue.js



const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
