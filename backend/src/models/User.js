const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    role: {
      type: String,
      enum: ["player", "master", "admin"],
      default: "player",
    },
    // інші поля за потребою
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
