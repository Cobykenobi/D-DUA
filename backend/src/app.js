const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directories exist
const uploadDir = path.join(__dirname, '..', 'uploads');
const mapsDir = path.join(uploadDir, 'maps');
fs.mkdirSync(mapsDir, { recursive: true });

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));
