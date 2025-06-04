// backend/models/Characteristic.js
const mongoose = require('mongoose');

const characteristicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Characteristic', characteristicSchema);
