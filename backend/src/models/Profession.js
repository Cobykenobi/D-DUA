// backend/models/Profession.js
const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profession', professionSchema);
