export function normalizeInventory(inventory) {
  if (Array.isArray(inventory)) {
    return { type: 'array', items: inventory };
  }
  if (inventory && typeof inventory === 'object') {
    return { type: 'object', items: Object.entries(inventory) };
  }
  return { type: 'empty', items: [] };
}
