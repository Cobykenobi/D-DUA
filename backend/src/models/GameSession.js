const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
  tableId: { type: String, required: true, unique: true },
  gm: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  players: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    characterId: String,
    online: { type: Boolean, default: true }
  }],
  monsters: [{ name: String, stats: Object, img: String }],
  initiative: [{ name: String, value: Number, type: String }], // type: "player"/"monster"
  map: { type: String }, // url or base64
  chat: [{ user: String, text: String, timestamp: Date }],
  state: { type: String, default: "lobby" }
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
