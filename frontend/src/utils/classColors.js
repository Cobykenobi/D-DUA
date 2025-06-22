export function getClassBorderColor(profession) {
  const map = {
    warrior: 'border-red-600',
    mage: 'border-blue-600',
    archer: 'border-green-600',
    paladin: 'border-yellow-600',
    bard: 'border-purple-600',
    healer: 'border-teal-600',
    druid: 'border-green-700',
  };
  if (typeof profession !== 'string' || profession.trim() === '')
    return 'border-dndgold';
  const key = profession.toLowerCase();
  return map[key] || 'border-dndgold';
}
