const express = require('express');
const router = express.Router();

const { authRequired, adminOnly } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Lista utenti (solo admin)
router.get('/', authRequired, adminOnly, userController.listUsers);

module.exports = router;

