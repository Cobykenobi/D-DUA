// backend/models/Character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
  profession: { type: mongoose.Schema.Types.ObjectId, ref: 'Profession' },
  stats: {
    health: { type: Number, default: 5 },
    defense: { type: Number, default: 5 },
    strength: { type: Number, default: 5 },
    intellect: { type: Number, default: 5 },
    agility: { type: Number, default: 5 },
    charisma: { type: Number, default: 5 }
  },
  inventory: [{
    item: { type: String },
    amount: { type: Number, default: 1 },
    bonus: { type: Map, of: Number, default: {} }
  }],
  description: { type: String, default: '' },
  image: { type: String, default: '' }, // посилання на файл/URL
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);
