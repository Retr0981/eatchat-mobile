/**
 * Supabase client initialization.
 * This file is ready to connect to your Supabase project.
 * To activate: set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
 * in your .env file or in app.config.ts extras.
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Returns whether Supabase is configured and ready to use.
 * If false, the app will run in demo/mock mode.
 */
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
