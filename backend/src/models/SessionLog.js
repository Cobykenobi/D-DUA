const mongoose = require("mongoose");

const SessionLogSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SessionLog", SessionLogSchema);