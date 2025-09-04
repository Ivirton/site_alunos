const express = require("express");
const router = express.Router();
const escolaController = require("../controllers/escolaController");

router.get("/:id", escolaController.verEscola);
router.get('/', escolaController.listarEscolas);

router.post("/:id/alunos/add", escolaController.adicionarAluno);

router.delete("/alunos/:codigo/delete", escolaController.deletarAluno);

module.exports = router;