const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Реєстрація
router.post('/register', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required' });
  }
  const candidate = await User.findOne({ login });
  if (candidate) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ login, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Логін
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required' });
  }
  const user = await User.findOne({ login });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '24h' });
  res.json({ token, user: { _id: user._id, login: user.login } });
});

module.exports = router;
