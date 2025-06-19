import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any;
  setToken: (token: string, user: any) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token, user) => set({ token, user }),
      clearToken: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
