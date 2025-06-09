// backend/models/Roll.js
const mongoose = require('mongoose');

const rollSchema = new mongoose.Schema({
  roller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diceType: { type: String, required: true }, // напр. 'd20', 'd6'
  value: { type: Number, required: true },
  isPrivate: { type: Boolean, default: false },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roll', rollSchema);
