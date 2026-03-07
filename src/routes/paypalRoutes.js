const express = require("express");
const { create, capture } = require("../controllers/paypalController");

const router = express.Router();

router.post("/create-order", create);
router.post("/capture-order/:orderId", capture);

module.exports = router;
