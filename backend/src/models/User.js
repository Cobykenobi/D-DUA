const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'master'], default: 'user' },
  // Додаткові поля можна додати тут
});

module.exports = mongoose.model('User', UserSchema);
