import translateOrRaw from './translateOrRaw.js';

export default function translateEffect(effectString, t) {
  if (!effectString) return effectString;
  return effectString.replace(/\+(\d+)\s([A-Z]+)/g, (_, num, stat) => {
    const key = stat.toLowerCase();
    return `+${num} ${translateOrRaw(t, 'stats.' + key, stat)}`;
  });
}
