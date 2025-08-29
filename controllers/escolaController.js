const db = require("../config/db");
const Escola = require("../models/escolaModel");
exports.verEscola = (req, res) => {
  const id = req.params.id;

  // Buscar dados da escola
  db.get("SELECT * FROM Escola WHERE id_escola = ?", [id], (err, escola) => {
    if (err || !escola) return res.status(500).send("Escola não encontrada");

    // Buscar professores
    db.all("SELECT * FROM Professor WHERE id_escola = ?", [id], (err2, professores) => {
      if (err2) return res.status(500).send("Erro ao buscar professores");

      // Buscar alunos Alfa
      db.all("SELECT * FROM Aluno WHERE id_escola = ? AND nivel_prova = 'Alfa'", [id], (err3, alunosAlfa) => {
        if (err3) return res.status(500).send("Erro ao buscar alunos Alfa");

        // Buscar alunos Beta
        db.all("SELECT * FROM Aluno WHERE id_escola = ? AND nivel_prova = 'Beta'", [id], (err4, alunosBeta) => {
          if (err4) return res.status(500).send("Erro ao buscar alunos Beta");

          res.render("escola", {
            escola,
            professores,
            alunosAlfa,
            alunosBeta,
            totalAlunos: alunosAlfa.length + alunosBeta.length
          });
        });
      });
    });
  });
};
exports.listarEscolas = (req, res) => {
  Escola.listar((err, escolas) => {
    
    if (err) return res.status(500).send("Erro ao buscar alunos");
    console.log(escolas);
    res.render("escolas", { escolas });
    // res.json(escolas);
  });
};