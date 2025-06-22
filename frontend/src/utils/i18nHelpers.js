export const translateOrRaw = (t, key) => {
  const value = t(key);
  return value === key ? key : value;
};
