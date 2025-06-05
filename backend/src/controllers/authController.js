const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Секретний ключ (краще винести в .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: "Login and password are required" });
    }
    // Перевірка на унікальність
    const candidate = await User.findOne({ login });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ login, password: hash });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: "Login and password are required" });
    }
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Токен (за потреби)
    const token = jwt.sign({ userId: user._id, login: user.login }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, login: user.login } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
