function getPostLoginRedirect(role) {
  return role === 'gm' || role === 'admin' ? '/gm-dashboard' : '/profile';
}

module.exports = getPostLoginRedirect;
