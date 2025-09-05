const express = require("express");
const router = express.Router();
const escolaController = require("../controllers/escolaController");

router.get("/:id", escolaController.verEscola);
router.get('/', escolaController.listarEscolas);

router.post("/:id/alunos/add", escolaController.adicionarAluno);

router.patch("/alunos/:id_aluno/edit", escolaController.editarNomeAluno);

router.delete("/:id/alunos/:codigo/delete", escolaController.deletarAluno);

module.exports = router;