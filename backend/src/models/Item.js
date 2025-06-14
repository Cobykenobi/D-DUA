// backend/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
  bonuses: { type: Map, of: Number, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
