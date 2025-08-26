const db = require("../config/db");

exports.uploadJson = (req, res) => {
  if (!req.files || !req.files.jsonFile) {
    return res.status(400).send("Nenhum arquivo enviado");
  }

  const jsonData = JSON.parse(req.files.jsonFile.data.toString());

  Object.keys(jsonData).forEach(codigo => {
    const dados = jsonData[codigo];
    const resumo = dados.resumo;

    db.get("SELECT id_aluno FROM Aluno WHERE codigo = ?", [codigo], (err, aluno) => {
      if (aluno) {
        db.run(
          `INSERT INTO CartaoResposta (codigo, respostas, id_aluno, total_acertos, total_erros, anulanos) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            codigo,
            JSON.stringify(dados),
            aluno.id_aluno,
            resumo.acertos,
            resumo.total_questoes - resumo.acertos,
            resumo.anuladas
          ]
        );
      }
    });
  });

  res.redirect("/alunos");
};
