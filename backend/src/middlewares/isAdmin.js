module.exports = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied: Admins only." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Authorization error" });
  }
};