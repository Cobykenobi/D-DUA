const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password are required' });
    }
    // Перевірка унікальності логіна
    const existing = await User.findOne({ login });
    if (existing) {
      return res.status(400).json({ message: 'Login already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ login, password: hash });
    await user.save();
    // Генеруємо токен
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "devsecret", { expiresIn: '7d' });
    res.json({ user: { id: user._id, login: user.login, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password are required' });
    }
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "devsecret", { expiresIn: '7d' });
    res.json({ user: { id: user._id, login: user.login, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
