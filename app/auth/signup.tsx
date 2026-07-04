/**
 * Sign Up Screen — New user registration with name, email, phone, and password.
 * After signup, navigates to phone verification → complete profile.
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

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    // TODO: Replace with Supabase auth.signUp()
    setTimeout(() => {
      setIsLoading(false);
      if (phone) {
        router.push("/auth/verify-phone");
      } else {
        router.push("/auth/complete-profile");
      }
    }, 1500);
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
            <Text style={styles.emoji}>👋</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join the foodie community
            </Text>
          </View>

          {/* Signup Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
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
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Text style={styles.hint}>
                Optional — adding your phone enables SMS verification for extra security.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Signup */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert("Google", "Google signup coming soon!")}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert("Apple", "Apple signup coming soon!")}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIcon}>🍎</Text>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text style={styles.loginLinkText}>Log In</Text>
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
  backButton: { marginBottom: 20 },
  backButtonText: { fontSize: 16, color: "#ff6b35", fontWeight: "600" },
  header: { alignItems: "center", marginBottom: 32 },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", color: "#1a1a2e" },
  subtitle: { fontSize: 16, color: "#6c757d", marginTop: 4 },
  form: { gap: 16, marginBottom: 24 },
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: "600", color: "#1a1a2e" },
  input: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1a1a2e",
    backgroundColor: "#f8f9fa",
  },
  hint: { fontSize: 12, color: "#6c757d", marginTop: 4 },
  signupButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  signupButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e9ecef" },
  dividerText: { fontSize: 14, color: "#6c757d" },
  socialButtons: { flexDirection: "row", gap: 12, marginBottom: 24 },
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
  socialButtonText: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  loginText: { fontSize: 14, color: "#6c757d" },
  loginLinkText: { fontSize: 14, color: "#ff6b35", fontWeight: "600" },
});
