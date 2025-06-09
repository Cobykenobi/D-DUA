// backend/models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
  items: [{
    name: { type: String, required: true },
    amount: { type: Number, default: 1 },
    description: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
