/**
 * Match Store — Manages user match state using Zustand.
 * Stores active matches and match history.
 */
import { create } from "zustand";
import type { Match } from "@/types";

interface MatchStore {
  // State
  matches: Match[];
  isLoading: boolean;

  // Actions
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  removeMatch: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  isLoading: false,

  setMatches: (matches) => set({ matches }),
  addMatch: (match) =>
    set((state) => ({ matches: [match, ...state.matches] })),
  removeMatch: (id) =>
    set((state) => ({ matches: state.matches.filter((m) => m.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
}));
