// controllers/authController.js

const { registerUser, loginUser } = require('../services/userService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// Registrazione
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    res.json({ message: "Registrazione completata", user });
  } catch (err) {
    console.error("Errore register:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json(data);
  } catch (err) {
    console.error("Errore login:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Info utente loggato
exports.me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token mancante" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    });

  } catch (err) {
    console.error("Errore me:", err);
    res.status(401).json({ error: "Token non valido" });
  }
};
