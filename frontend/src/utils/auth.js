export const getStoredUserRole = () => {
  try {
    const data = JSON.parse(localStorage.getItem('user-storage') || '{}');
    return data.state?.user?.role || null;
  } catch {
    return null;
  }
};
