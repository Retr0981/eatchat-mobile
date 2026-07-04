/**
 * Craving Store — Manages food craving state using Zustand.
 * Stores active cravings, user's own cravings, and feed filters.
 */
import { create } from "zustand";
import type { Craving, FoodCategory } from "@/types";

interface CravingStore {
  // State
  cravings: Craving[];
  myCravings: Craving[];
  selectedCategory: FoodCategory | null;
  isLoading: boolean;
  isMapView: boolean;

  // Actions
  setCravings: (cravings: Craving[]) => void;
  setMyCravings: (cravings: Craving[]) => void;
  addCraving: (craving: Craving) => void;
  removeCraving: (id: string) => void;
  setSelectedCategory: (category: FoodCategory | null) => void;
  setLoading: (loading: boolean) => void;
  toggleMapView: () => void;
}

export const useCravingStore = create<CravingStore>((set) => ({
  cravings: [],
  myCravings: [],
  selectedCategory: null,
  isLoading: false,
  isMapView: true,

  setCravings: (cravings) => set({ cravings }),
  setMyCravings: (myCravings) => set({ myCravings }),
  addCraving: (craving) =>
    set((state) => ({
      myCravings: [craving, ...state.myCravings],
      cravings: [craving, ...state.cravings],
    })),
  removeCraving: (id) =>
    set((state) => ({
      myCravings: state.myCravings.filter((c) => c.id !== id),
      cravings: state.cravings.filter((c) => c.id !== id),
    })),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),
  toggleMapView: () => set((state) => ({ isMapView: !state.isMapView })),
}));
