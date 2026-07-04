/**
 * App Entry Point — Expo Router handles root component registration.
 * We just import the router entry and initialize Supabase before navigation loads.
 */
import "@/lib/supabase"; // Initialize Supabase client early
import "expo-router/entry";
