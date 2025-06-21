function getPostLoginRedirect(role) {
  return role === 'gm' || role === 'admin' ? '/gm-dashboard' : '/characters';
}

module.exports = getPostLoginRedirect;
