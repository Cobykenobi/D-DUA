// backend/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true }, // логін (замість username)
  password: { type: String, required: true },
  // додаткові поля, якщо треба
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
