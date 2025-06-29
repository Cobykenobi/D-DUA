const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Реєстрація
exports.register = async (req, res) => {
  try {
    const { login, password, username, role } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: "Login and password are required" });
    }

    // Default username to login if not provided
    const finalUsername = username || login;

    const candidate = await User.findOne({ login });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    let finalRole = 'player';
    if (['gm', 'admin'].includes(role)) {
      finalRole = role;
    }
    const user = new User({
      login,
      password: hash,
      username: finalUsername,
      role: finalRole,
    });
    await user.save();

    res.status(201).json({
      message: "User created",
      user: {
        _id: user._id,
        login: user.login,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

// Логін
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

    const token = jwt.sign(
      { _id: user._id, login: user.login, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        login: user.login,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// Зміна пароля
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password successfully changed" });
  } catch (err) {
    res.status(500).json({ message: "Password change error", error: err.message });
  }
};
