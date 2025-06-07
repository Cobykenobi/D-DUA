const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://d-dua-1.onrender.com"
  ],
  credentials: true,
}));

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/auth", require("./routes/auth"));

// ===== CONNECT DB AND START SERVER =====
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("DB connection error:", err);
});
