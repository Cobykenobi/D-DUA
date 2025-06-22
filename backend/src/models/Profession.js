const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  modifiers: { type: Map, of: Number, default: {} },
  inventory: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Profession', professionSchema);
