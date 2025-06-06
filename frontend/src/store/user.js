import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
  console.log("setUser called", user, token);
  set({ user, token });
  // далі як було
    set({ user, token });
    if (user && token) {
      localStorage.setItem('dnd_user', JSON.stringify(user));
      localStorage.setItem('dnd_token', token);
    } else {
      localStorage.removeItem('dnd_user');
      localStorage.removeItem('dnd_token');
    }
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('dnd_user');
    localStorage.removeItem('dnd_token');
  },
 restore: () => {
  const user = JSON.parse(localStorage.getItem('dnd_user'));
  const token = localStorage.getItem('dnd_token');
  console.log("restore called", user, token);
  if (user && token) set({ user, token });
}
}));
