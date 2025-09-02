const Aluno = require("../models/alunoModel");
const Escola = require("../models/escolaModel");
const CartaoResposta = require("../models/cartaoRespostaModel");

const fs = require('fs');
const path = require('path');
const db = require("../config/db");
const { json } = require("body-parser");

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
      CartaoResposta.buscarPorAluno(aluno.codigo, (err3, cartao) => {
        if (err3) return res.status(500).send("Erro ao buscar cartão resposta");

        
        if(cartao){
          
          var jason_questoes = JSON.parse(cartao.resultado);
        }
        else{
          var jason_questoes = null;
        }
       

          res.render("aluno", { aluno, escola, jason_questoes });

      })
    });


    // res.json({ aluno})
  });
};
