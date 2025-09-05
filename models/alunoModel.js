const db = require("../config/db");

class Aluno {
  constructor(nome, codigo, nivel_prova, descricao_necessidade, id_escola){
    this.nome = nome;
    this.codigo = codigo;
    this.nivel_prova = nivel_prova;
    this.descricao_necessidade = descricao_necessidade;
    this.id_escola = id_escola;
  }

  static listar(callback) {
    db.all("SELECT * FROM Aluno", [], callback);
  }

  static buscarPorId(id, callback) {
    db.get("SELECT * FROM Aluno WHERE id_aluno = ?", [id], callback);
  }

  static getTotal(callback) {
    db.all("SELECT COUNT(*) AS total FROM Aluno", [], callback);
    // db.get("SELECT COUNT(*) AS total FROM Aluno", [], callback);
    // db.get("SELECT COUNT(*) AS total FROM CartaoResposta", [], (err, row) => {
    //     callback(err, row ? row.total : 0);
    // });
  }

  static getQtdPorNivel(callback) {
    db.all(`
      SELECT nivel_prova, COUNT(*) as total 
      FROM Aluno 
      GROUP BY nivel_prova
    `, [], (err, rows) => {
      callback(err, rows || []);
    });
  }

  static getQtdPorEscola (callback) {
    db.all(`
      SELECT e.nome AS escola, COUNT(a.id_aluno) as total
      FROM Escola e
      LEFT JOIN Aluno a ON e.id_escola = a.id_escola
      GROUP BY e.id_escola
    `, [], (err, rows) => {
      callback(err, rows || []);
    });
  }

  static adicionar(aluno, callback){
    db.run(`
      INSERT INTO Aluno (nome, codigo, nivel_prova, descricao_necessidade, id_escola)
      VALUES (?, ?, ?, ?, ?)`, 
      [aluno.nome, aluno.codigo, aluno.nivel_prova, aluno.descricao_necessidade, aluno.id_escola],
      function (err){
        if(err) {
          console.log("Erro ao inserir o aluno!");
          callback(err);
        }

        else{
          console.log("Id adicionado: ", this.lastID);
          callback(null, this.lastID);
        }
      }
    );
  } 

  static deletar(codigo, callback) {
    db.run("DELETE FROM Aluno WHERE codigo = ?", [codigo], function(err) {
      if (err) {
        console.log("Erro ao remover o aluno!");
        return callback(err);
      }

      console.log("Linhas removidas: ", this.changes);
      callback(null, this.changes); 
    });
  }

  static editar(id_aluno, novo_nome, callback){
    db.run("UPDATE Aluno SET nome = ? WHERE id_aluno = ?", [novo_nome, id_aluno], 
      function(err){
        if (err) {
          console.log("Erro ao editar o nome!");
          return callback(err);
        }

        console.log("Edição feita? ", this.changes == 1);
        callback(null, this.changes); 
      }
    );
  }
}

module.exports = Aluno;
