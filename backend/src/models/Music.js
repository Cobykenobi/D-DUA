// backend/models/Music.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // YouTube або інше
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // майстер
}, { timestamps: true });

module.exports = mongoose.model('Music', musicSchema);
