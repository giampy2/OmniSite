const express = require('express');
const { getAdminStats } = require('../controllers/adminController');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', authRequired, adminOnly, getAdminStats);

module.exports = router;
