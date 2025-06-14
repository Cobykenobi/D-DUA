diff --git a/backend/src/middleware/onlyMaster.js b/backend/src/middleware/onlyMaster.js
index aee516300e9156fbff061b8f9c90c5b0977afeb9..a6226083c576c919fd86836acdda16e86fdce109 100644
--- a/backend/src/middleware/onlyMaster.js
+++ b/backend/src/middleware/onlyMaster.js
@@ -1,4 +1,8 @@
-module.exports = (req, res, next) => {
-  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
-  return res.status(403).json({ message: 'Forbidden' });
-};
+function onlyMaster(req, res, next) {
+  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) {
+    return next();
+  }
+  return res.status(403).json({ message: 'Forbidden' });
+}
+
+module.exports = onlyMaster;
