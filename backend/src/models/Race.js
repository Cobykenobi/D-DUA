// backend/models/Race.js
const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Race', raceSchema);
