/**
 * App Entry Point — Wraps the Expo Router layout.
 * Expo Router handles all navigation through the app/ directory.
 * NOTE: index.ts loads expo-router/entry directly; this file is kept
 * for compatibility with expo-doctor and other tooling that expects it.
 */
import "@/lib/supabase"; // Initialize Supabase client early
import "expo-router/entry";

export default {};
