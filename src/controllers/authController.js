const { registerUser, loginUser } = require('../services/userService');

async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role
  });
}

module.exports = {
  register,
  login,
  me
};
