const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  modifiers: { type: Map, of: Number, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Race', raceSchema);
