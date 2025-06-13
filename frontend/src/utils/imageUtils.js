export function withApiHost(path) {
  if (!path) return path;
  // Already absolute (http, https, data, etc.)
  if (/^[a-z][a-z0-9+.-]*:/.test(path)) {
    return path;
  }
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  try {
    return new URL(path, base).href;
  } catch {
    return path;
  }
}
