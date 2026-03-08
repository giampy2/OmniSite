const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // Per ora in memoria, poi lo spostiamo su DB

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// Registrazione utente
async function registerUser(email, password, role = "user") {
  const existing = users.find(u => u.email === email);
  if (existing) {
    const err = new Error("Utente già esistente");
    err.status = 400;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashed,
    role
  };

  users.push(user);

  return { id: user.id, email: user.email, role: user.role };
}

// Login utente
async function loginUser(email, password) {
  const user = users.find(u => u.email === email);
  if (!user) {
    const err = new Error("Credenziali non valide");
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error("Credenziali non valide");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

// Lista utenti (solo admin)
function listUsers() {
  return users.map(u => ({
    id: u.id,
    email: u.email,
    role: u.role
  }));
}

module.exports = {
  registerUser,
  loginUser,
  listUsers
};
