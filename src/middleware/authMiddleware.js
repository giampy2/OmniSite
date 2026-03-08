// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token mancante" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id, email, role
    next();
  } catch (err) {
    console.error("Errore authMiddleware:", err);
    res.status(401).json({ error: "Token non valido" });
  }
};
