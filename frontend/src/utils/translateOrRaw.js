export default function translateOrRaw(t, key, raw = '') {
  if (!key) return t('unknown');
  const translated = t(key);
  return translated === key ? raw || t('unknown') : translated;
}
