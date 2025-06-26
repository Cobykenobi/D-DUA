const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema({
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  background: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Appearance', appearanceSchema);
