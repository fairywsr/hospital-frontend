import { create } from "zustand";

export const useAuthStore = create(() => ({
  user: null,

  setUser: (user) => {
    set(user);
  },

  clearUser: (user) => {
    set(user);
  },
}));
