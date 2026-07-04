/**
 * Welcome / Splash Screen — First screen users see.
 * Shows EatChat branding with animated food emojis and CTA buttons.
 */
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo & Branding */}
        <View style={styles.branding}>
          <Text style={styles.logo}>🍔</Text>
          <Text style={styles.appName}>EatChat</Text>
          <Text style={styles.tagline}>
            Connect Over What You're Craving
          </Text>
        </View>

        {/* Floating food emojis */}
        <View style={styles.emojisContainer}>
          <Text style={[styles.emoji, styles.emoji1]}>🍕</Text>
          <Text style={[styles.emoji, styles.emoji2]}>🍣</Text>
          <Text style={[styles.emoji, styles.emoji3]}>🌮</Text>
          <Text style={[styles.emoji, styles.emoji4]}>🍜</Text>
          <Text style={[styles.emoji, styles.emoji5]}>🧁</Text>
        </View>

        {/* Value Propositions */}
        <View style={styles.valueProps}>
          {[
            { icon: "📝", text: "Post your food cravings" },
            { icon: "🎯", text: "Match with nearby foodies" },
            { icon: "🍽️", text: "Meet up and eat together" },
          ].map((item, index) => (
            <View key={index} style={styles.valuePropRow}>
              <Text style={styles.valuePropIcon}>{item.icon}</Text>
              <Text style={styles.valuePropText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/auth/signup")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/auth/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  branding: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    fontSize: 72,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1a1a2e",
    marginTop: 8,
  },
  tagline: {
    fontSize: 18,
    color: "#6c757d",
    marginTop: 8,
    textAlign: "center",
  },
  emojisContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    gap: 20,
  },
  emoji: {
    fontSize: 40,
  },
  emoji1: { marginTop: 0 },
  emoji2: { marginTop: -15 },
  emoji3: { marginTop: 10 },
  emoji4: { marginTop: -20 },
  emoji5: { marginTop: 5 },
  valueProps: {
    marginTop: 40,
    gap: 16,
  },
  valuePropRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 16,
  },
  valuePropIcon: {
    fontSize: 28,
  },
  valuePropText: {
    fontSize: 16,
    color: "#1a1a2e",
    fontWeight: "500",
  },
  buttons: {
    marginTop: "auto",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#ff6b35",
    fontSize: 16,
    fontWeight: "600",
  },
});
