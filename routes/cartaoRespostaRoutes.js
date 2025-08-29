const express = require("express");
const router = express.Router();
const cartaoController = require("../controllers/cartaoController");

router.get("/:id", cartaoController.verCartao);

module.exports = router;
