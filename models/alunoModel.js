const db = require("../config/db");

class Aluno {
  static listar(callback) {
    db.all("SELECT * FROM Aluno", [], callback);
  }

  static buscarPorId(id, callback) {
    db.get("SELECT * FROM Aluno WHERE id_aluno = ?", [id], callback);
  }
}

module.exports = Aluno;
