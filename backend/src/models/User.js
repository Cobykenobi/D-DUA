const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    settings: {
      musicVolume: { type: Number, default: 50 },
      brightness: { type: Number, default: 50 },
    },
    // інші поля за потребою
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
