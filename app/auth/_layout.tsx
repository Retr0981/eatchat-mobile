/**
 * Auth Layout — Stack navigator for authentication screens.
 */
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify-phone" />
      <Stack.Screen name="complete-profile" />
    </Stack>
  );
}
