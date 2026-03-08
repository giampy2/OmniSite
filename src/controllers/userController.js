// controllers/userController.js

const { listUsers } = require('../services/userService');

// Lista utenti (solo admin)
exports.listUsers = (req, res) => {
  try {
    const users = listUsers();
    res.json(users);
  } catch (err) {
    console.error("Errore listUsers:", err);
    res.status(500).json({ error: "Errore server" });
  }
};

// Profilo utente
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // preso dal token
    // Qui dovresti leggere l'utente dal DB
    res.json({ message: "Profilo utente OK", userId });
  } catch (err) {
    console.error("Errore getUserProfile:", err);
    res.status(500).json({ error: "Errore server" });
  }
};

// Aggiornamento profilo utente
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    // Qui aggiorneresti il DB
    res.json({ message: "Profilo aggiornato", userId, data });
  } catch (err) {
    console.error("Errore updateUserProfile:", err);
    res.status(500).json({ error: "Errore server" });
  }
};
