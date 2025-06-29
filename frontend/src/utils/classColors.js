export function getClassBorderColor(profession) {
  const map = {
    warrior: 'border-red-600',
    archer: 'border-green-600',
    paladin: 'border-yellow-600',
    bard: 'border-purple-600',
    healer: 'border-teal-600',
    wizard: 'border-indigo-600',
    assassin: 'border-gray-600'
  };
  const key = (profession || '').toLowerCase();
  if (!key) return 'border-dndgold';
  return map[key] || 'border-dndgold';
}
