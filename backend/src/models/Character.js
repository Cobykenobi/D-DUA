// backend/models/Character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
  profession: { type: mongoose.Schema.Types.ObjectId, ref: 'Profession' },
  stats: [{
    characteristic: { type: mongoose.Schema.Types.ObjectId, ref: 'Characteristic' },
    value: { type: Number, default: 0 },
  }],
  inventory: [{
    item: { type: String },
    amount: { type: Number, default: 1 }
  }],
  description: { type: String, default: '' },
  image: { type: String, default: '' }, // посилання на файл/URL
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);
