const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Página inicial (dashboard)
router.get('/', homeController.dashboard);

module.exports = router;
