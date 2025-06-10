const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socket = require("./socket");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directories exist
const uploadDir = path.join(__dirname, "..", "uploads");
const mapsDir = path.join(uploadDir, "maps");
fs.mkdirSync(mapsDir, { recursive: true });

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/character", require("./routes/character"));
app.use("/api/characteristic", require("./routes/characteristic"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/map", require("./routes/map"));
app.use("/api/music", require("./routes/music"));
app.use("/api/profession", require("./routes/profession"));
app.use("/api/race", require("./routes/race"));
app.use("/api/roll", require("./routes/roll"));
app.use("/api/session", require("./routes/session"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const server = http.createServer(app);
    const io = socket.init(server);
    app.set("io", io);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));