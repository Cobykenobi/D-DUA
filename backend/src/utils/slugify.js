module.exports = function slugify(str) {
  return String(str).toLowerCase().replace(/\s+/g, '_');
};
