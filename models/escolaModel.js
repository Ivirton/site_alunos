const db = require("../config/db");

class Escola {
  static listar(callback) {
    db.all("SELECT * FROM Escola", [], callback);
  }

  static buscarPorId(id, callback) {
    db.get("SELECT * FROM Escola WHERE id_escola = ?", [id], callback);
  }
}

module.exports = Escola;
