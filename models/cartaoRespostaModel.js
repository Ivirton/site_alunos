const db = require("../config/db");

class CartaoResposta {

    static listar(callback) {
        db.all("SELECT * FROM CartaoResposta", [], callback);
    }
    static buscarPorId(id, callback) {
        db.get("SELECT * FROM CartaoResposta WHERE id_cartao_resposta = ?", [id], callback);
    }
    static buscarPorAluno(codigo, callback) {
        db.get("SELECT * FROM CartaoResposta WHERE codigo = ?", [codigo], callback);
    }
    static criar(cartaoResposta, callback) {
        const { id_aluno, respostas } = cartaoResposta;
        db.run(
            "INSERT INTO CartaoResposta (id_aluno, respostas) VALUES (?, ?)",
            [id_aluno, respostas],
            function (err) {
                callback(err, this ? this.lastID : null);
            }
        );
    }
    static atualizar(id, cartaoResposta, callback) {
        const { id_aluno, respostas } = cartaoResposta;
        db.run(
            "UPDATE CartaoResposta SET id_aluno = ?, respostas = ? WHERE id_cartao_resposta = ?",
            [id_aluno, respostas, id],
            function (err) {
                callback(err, this ? this.changes : 0);
            }
        );
    }
    static deletar(id, callback) {
        db.run("DELETE FROM CartaoResposta WHERE id_cartao_resposta = ?", [id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }
    static getTotal(callback) {
         
        db.all("SELECT COUNT(*) AS total FROM CartaoResposta", [], callback);
    }
    

}

module.exports = CartaoResposta;