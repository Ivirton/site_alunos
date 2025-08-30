const Escola = require('../models/escolaModel');
const Aluno = require('../models/alunoModel');
const CartaoResposta = require('../models/cartaoRespostaModel');

exports.dashboard = (req, res) => {
  Escola.getTotal((errPorEscola,totalEscolas) => {
    Aluno.getTotal((errPorAlunos, totalAlunos) => {
      CartaoResposta.getTotal((errPorCartao,totalCartoes) => {
        console.log("total cartao");
        console.log(totalCartoes);
        Aluno.getQtdPorEscola((errPorEscola, listaEscolas) => {
          Aluno.getQtdPorNivel((errPorNivel, listaNiveis) => {

            const nomesEscolas = listaEscolas.map(e => e.escola);
            const qtdAlunos = listaEscolas.map(e => e.total);

            const niveis = ["Alfa", "Beta"];
            const qtdPorNivel = niveis.map(n => {
              const encontrado = listaNiveis.find(l => l.nivel_prova === n);
              return encontrado ? encontrado.total : 0;
            });
            console.log(totalAlunos)
            // res.json({ totalEscolas, totalAlunos, totalCartoes, nomesEscolas, qtdAlunos, qtdPorNivel });
            res.render('index', {
              totalEscolas,
              totalAlunos,
              totalCartoes,
              nomesEscolas,
              qtdAlunos,
              qtdPorNivel
            });
          });
        });
      });
    });
  });
};
