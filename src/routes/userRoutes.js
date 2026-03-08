const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { profile, updateProfile, listUsers } = require("../controllers/userController");

router.get("/profile", auth, profile);
router.put("/profile", auth, updateProfile);
router.get("/", auth, listUsers);

module.exports = router;


