// backend/models/StartingSet.js
const mongoose = require('mongoose');
require('./Item');

const startingSetSchema = new mongoose.Schema({
  raceCode: { type: String, required: true },
  classCode: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

module.exports = mongoose.model('StartingSet', startingSetSchema);
