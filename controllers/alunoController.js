const Aluno = require("../models/alunoModel");
const Escola = require("../models/escolaModel");
const fs = require('fs');
const path = require('path');
const db = require("../config/db");

exports.listarAlunos = (req, res) => {
  Aluno.listar((err, alunos) => {

    if (err) return res.status(500).send("Erro ao buscar alunos");
    res.render("alunos", { alunos });
    // res.json(alunos);
  });
};

exports.verAluno = (req, res) => {
  const id = req.params.id;
  Aluno.buscarPorId(id, (err, aluno) => {
   
    db.get("SELECT * FROM Escola WHERE id_escola = ?", [aluno.id_escola], (err2, escola) => {
      if (err2) return res.status(500).send("Erro ao buscar cartão resposta");
      const filePath = path.join(__dirname, '../public/cartoes', `${aluno.codigo}.png`);
      // const cartaoExiste = fs.existsSync(filePath);
      // console.log(cartaoExiste);
      res.render("aluno", { aluno, escola  });
    });


    // res.json({ aluno})
  });
};
