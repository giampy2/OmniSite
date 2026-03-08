const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email già registrata" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    res.json({ message: "Registrazione completata", user });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenziali errate" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Credenziali errate" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
