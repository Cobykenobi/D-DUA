

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
