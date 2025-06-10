const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socket = require("./socket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/ai", require("./routes/ai"));

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
