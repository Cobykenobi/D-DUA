// backend/models/Character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
  profession: { type: mongoose.Schema.Types.ObjectId, ref: 'Profession' },
  stats: {
    STR: { type: Number, default: 10 },
    DEX: { type: Number, default: 10 },
    INT: { type: Number, default: 10 },
    CON: { type: Number, default: 10 },
    CHA: { type: Number, default: 10 }
  },
  inventory: [{
    item: { type: String },
    amount: { type: Number, default: 1 }
  }],
  description: { type: String, default: '' },
  image: { type: String, default: '' }, // посилання на файл/URL
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);
