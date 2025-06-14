// backend/models/Race.js
const mongoose = require('mongoose');


const raceSchema = new mongoose.Schema({

  name: { type: String, required: true },

  code: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
 main
}, { timestamps: true });
 main

module.exports = mongoose.model('Race', raceSchema);
