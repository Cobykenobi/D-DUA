// backend/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gm: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  activeMap: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  activeMusic: { type: mongoose.Schema.Types.ObjectId, ref: 'Music' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
