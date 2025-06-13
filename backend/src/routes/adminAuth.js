const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

async function loginHandler(req, res) {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password are required' });
    }

    const user = await User.findOne({ login });
    if (!user || user.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { _id: user._id, login: user.login, username: user.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        login: user.login,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
}

router.post('/login', loginHandler);
router.post('/', loginHandler);

module.exports = router;
