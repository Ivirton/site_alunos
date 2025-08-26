const Aluno = require("../models/alunoModel");
const db = require("../config/db");

exports.listarAlunos = (req, res) => {
  Aluno.listar((err, alunos) => {
    if (err) return res.status(500).send("Erro ao buscar alunos");
    res.render("alunos", { alunos });
  });
};

exports.verAluno = (req, res) => {
  const id = req.params.id;
  Aluno.buscarPorId(id, (err, aluno) => {
    if (err) return res.status(500).send("Erro ao buscar aluno");
    db.get("SELECT * FROM CartaoResposta WHERE id_aluno = ?", [id], (err2, cartao) => {
      if (err2) return res.status(500).send("Erro ao buscar cartão resposta");
      res.render("aluno", { aluno, cartao });
    });
  });
};
