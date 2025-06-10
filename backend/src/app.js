diff --git a/backend/src/app.js b/backend/src/app.js
index 9d37a060b2bcef090d468931467e01bb9c934c0f..016d09647a11ecbcc77f14e4a164595d745d1696 100644
--- a/backend/src/app.js
+++ b/backend/src/app.js
@@ -1,21 +1,31 @@
 const express = require("express");
 const cors = require("cors");
 const mongoose = require("mongoose");
+const fs = require("fs");
+const path = require("path");
 
 const app = express();
 app.use(cors());
 app.use(express.json());
 
+// Ensure uploads directories exist
+const uploadDir = path.join(__dirname, '..', 'uploads');
+const mapsDir = path.join(uploadDir, 'maps');
+fs.mkdirSync(mapsDir, { recursive: true });
+
+// Serve uploaded files
+app.use('/uploads', express.static(uploadDir));
+
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
