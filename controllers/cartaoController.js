const db = require("../config/db");

exports.verCartao = (req, res) => {
  const id = req.params.id;

  db.get("SELECT c.*, a.nome AS aluno_nome, a.codigo AS aluno_codigo FROM CartaoResposta c JOIN Aluno a ON c.id_aluno = a.id_aluno WHERE c.id_cartao = ?", [id], (err, cartao) => {
    if (err || !cartao) return res.status(500).send("Cartão não encontrado");

    let respostasDetalhes = [];
    if(cartao.respostas) {
      try {
        respostasDetalhes = JSON.parse(cartao.respostas);
      } catch(e) {
        respostasDetalhes = [];
      }
    }

    res.render("cartao", {
      cartao,
      respostasDetalhes
    });
  });
};
