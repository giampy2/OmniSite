const express = require('express');
const { listUsers } = require('../services/userService');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, adminOnly, (req, res) => {
  res.json(listUsers());
});

module.exports = router;
