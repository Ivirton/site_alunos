const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

router.get("/", alunoController.listarAlunos);
router.get("/:id", alunoController.verAluno);

module.exports = router;
