/**
 * Auth Store — Manages user authentication state using Zustand.
 * Tracks current session, user profile, and loading state.
 */
import { create } from "zustand";
import type { UserProfile, SessionData } from "@/types";

interface AuthStore {
  // State
  user: UserProfile | null;
  session: SessionData | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setSession: (session: SessionData | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Default state — not authenticated
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  // Set authenticated user
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  // Set session tokens
  setSession: (session) => set({ session }),

  // Toggle loading spinner
  setLoading: (isLoading) => set({ isLoading }),

  // Clear all auth state on logout
  logout: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
