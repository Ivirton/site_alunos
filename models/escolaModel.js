const db = require("../config/db");

class Escola {
  static listar(callback) {
    db.all("SELECT * FROM Escola", [], callback);
  }

  static buscarPorId(id, callback) {
    db.get("SELECT * FROM Escola WHERE id_escola = ?", [id], callback);
  }

  static getTotal(callback) {
    db.get("SELECT COUNT(*) AS total FROM Escola", [], (err, row) => {
      callback(err, row ? row.total : 0);
    });
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
  
  static getQtdPorEscola(callback) {
    db.all(`
      SELECT e.nome AS escola, COUNT(a.id_aluno) as total
      FROM Escola e
      LEFT JOIN Aluno a ON e.id_escola = a.id_escola
      GROUP BY e.id_escola
    `, [], (err, rows) => {
      callback(err, rows || []);
    })
  }
}

module.exports = Escola;
