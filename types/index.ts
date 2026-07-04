/**
 * Shared TypeScript types for EatChat mobile app.
 * These types mirror the Supabase database schema and are used
 * across all screens, components, and state management stores.
 */

// ─── User & Auth ──────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  food_preferences: string[]; // e.g., ["pizza", "sushi", "tacos"]
  location?: LocationData;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  session: SessionData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SessionData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// ─── Location ──────────────────────────────────────────────────

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  address?: string;
}

// ─── Cravings ──────────────────────────────────────────────────

export type CravingExpiry = "1h" | "4h" | "24h";

export interface Craving {
  id: string;
  user_id: string;
  user: UserProfile;
  food_type: string;        // e.g., "pizza", "sushi", "tacos"
  food_category: FoodCategory;
  description: string;
  photo_url?: string;
  location: LocationData;
  expiry: CravingExpiry;
  expires_at: string;       // ISO timestamp
  is_active: boolean;
  created_at: string;
}

export type FoodCategory =
  | "pizza"
  | "sushi"
  | "tacos"
  | "burger"
  | "ramen"
  | "dessert"
  | "coffee"
  | "thai"
  | "indian"
  | "bbq"
  | "salad"
  | "breakfast"
  | "other";

export const FOOD_CATEGORY_CONFIG: Record<FoodCategory, { emoji: string; label: string }> = {
  pizza: { emoji: "🍕", label: "Pizza" },
  sushi: { emoji: "🍣", label: "Sushi" },
  tacos: { emoji: "🌮", label: "Tacos" },
  burger: { emoji: "🍔", label: "Burger" },
  ramen: { emoji: "🍜", label: "Ramen" },
  dessert: { emoji: "🧁", label: "Dessert" },
  coffee: { emoji: "☕", label: "Coffee" },
  thai: { emoji: "🥘", label: "Thai" },
  indian: { emoji: "🍛", label: "Indian" },
  bbq: { emoji: "🥩", label: "BBQ" },
  salad: { emoji: "🥗", label: "Salad" },
  breakfast: { emoji: "🥞", label: "Breakfast" },
  other: { emoji: "🍽️", label: "Other" },
};

// ─── Matches ───────────────────────────────────────────────────

export type MatchStatus = "pending" | "accepted" | "declined" | "completed";

export interface Match {
  id: string;
  craving_id: string;
  craving: Craving;
  matched_user: UserProfile;
  status: MatchStatus;
  created_at: string;
}

// ─── Chat / Messages ───────────────────────────────────────────

export interface Conversation {
  id: string;
  match: Match;
  participants: UserProfile[];
  last_message?: Message;
  unread_count: number;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  photo_url?: string;
  created_at: string;
}
