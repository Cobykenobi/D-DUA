// backend/models/StartingSet.js
const mongoose = require('mongoose');

const startingSetSchema = new mongoose.Schema({
  classCode: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

module.exports = mongoose.model('StartingSet', startingSetSchema);
