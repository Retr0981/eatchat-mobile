/**
 * Login Screen — Email/password login with social login options.
 * Supports Google and Apple OAuth buttons (UI ready, needs provider config).
 */
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    // TODO: Replace with Supabase auth.signInWithPassword()
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      `${provider} Login`,
      `${provider} login requires Supabase provider configuration. Coming soon!`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🍔</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Log in to find your next food buddy
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => Alert.alert("Reset Password", "Password reset flow coming soon!")}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Logging in..." : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("Google")}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("Apple")}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIcon}>🍎</Text>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupLink}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text style={styles.signupLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  keyboardAvoid: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#ff6b35",
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
  },
  form: { gap: 16, marginBottom: 24 },
  inputGroup: { gap: 6 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1a1a2e",
    backgroundColor: "#f8f9fa",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: { opacity: 0.6 },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e9ecef" },
  dividerText: { fontSize: 14, color: "#6c757d" },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#f8f9fa",
  },
  socialButtonIcon: { fontSize: 20, fontWeight: "700" },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  signupText: { fontSize: 14, color: "#6c757d" },
  signupLinkText: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "600",
  },
});
