const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Роути
app.use("/api/auth", require("./routes/auth"));

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || "твій_рядок_підключення";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err.message));

// Сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
