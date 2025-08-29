const express = require("express");
const router = express.Router();
const escolaController = require("../controllers/escolaController");

router.get("/:id", escolaController.verEscola);
router.get('/', escolaController.listarEscolas);
module.exports = router;
