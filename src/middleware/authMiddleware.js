const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token mancante o invalido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contiene id, email, role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token non valido" });
  }
}

module.exports = authMiddleware;
