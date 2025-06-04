// backend/models/Map.js
const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // шлях до картинки/URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // майстер
}, { timestamps: true });

module.exports = mongoose.model('Map', mapSchema);
