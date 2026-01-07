import { create } from "zustand";
import type { AuthState, User } from "@/types";
import { authService } from "@/services/auth.service";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.checkAuth();
      set({
        user: response.data as User,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        error: error as Error,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(email, password);
      set({
        user: response.data as User,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        error: error as Error,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
