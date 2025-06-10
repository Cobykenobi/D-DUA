diff --git a/backend/src/app.js b/backend/src/app.js
index 9d37a060b2bcef090d468931467e01bb9c934c0f..355041581bd2d3407c06074248bab66a6b13f0dc 100644
--- a/backend/src/app.js
+++ b/backend/src/app.js
@@ -1,21 +1,31 @@
 const express = require("express");
 const cors = require("cors");
 const mongoose = require("mongoose");
 
 const app = express();
 app.use(cors());
 app.use(express.json());
 
 app.use("/api/auth", require("./routes/auth"));
+app.use("/api/character", require("./routes/character"));
+app.use("/api/characteristic", require("./routes/characteristic"));
+app.use("/api/inventory", require("./routes/inventory"));
+app.use("/api/map", require("./routes/map"));
+app.use("/api/music", require("./routes/music"));
+app.use("/api/profession", require("./routes/profession"));
+app.use("/api/race", require("./routes/race"));
+app.use("/api/roll", require("./routes/roll"));
+app.use("/api/session", require("./routes/session"));
+app.use("/api/user", require("./routes/user"));
 
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
