/**
 * Root Layout — Expo Router root layout with SafeAreaView and StatusBar.
 * Wraps the entire app with consistent safe area handling.
 */
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="chat/[id]"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="craving/[id]"
          options={{ headerShown: false, presentation: "card" }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
