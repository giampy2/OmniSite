const User = require("../models/User");

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
  res.json(user);
};

exports.listUsers = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Non autorizzato" });

  const users = await User.find().select("-password");
  res.json(users);
};

