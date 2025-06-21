const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableId: { type: String, required: true, unique: true },
  gm: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  state: { type: String, default: 'lobby' }
}, { timestamps: true });

module.exports = mongoose.model('Table', TableSchema);
