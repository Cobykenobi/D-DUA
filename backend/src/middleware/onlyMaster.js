function onlyMaster(req, res, next) {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
}

module.exports = onlyMaster;
