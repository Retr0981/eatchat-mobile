/**
 * Phone Verification Screen — OTP input for phone number verification.
 * 6-digit code entry with auto-focus and resend timer.
 */
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CODE_LENGTH = 6;

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) return; // Only single digit
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are filled
    if (text && index === CODE_LENGTH - 1 && newCode.every((c) => c !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleVerify = (codeStr: string) => {
    // TODO: Replace with Supabase auth.verifyOtp()
    Alert.alert("Verified!", "Phone number verified successfully.", [
      { text: "Continue", onPress: () => router.push("/auth/complete-profile") },
    ]);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(60);
    // TODO: Replace with Supabase auth.signInWithOtp()
    Alert.alert("Code Resent", "A new verification code has been sent.");
  };

  const handleBackspace = (index: number) => {
    if (code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>📱</Text>
          <Text style={styles.title}>Verify Your Phone</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to your phone number. Enter it below to verify.
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") handleBackspace(index);
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {countdown > 0 ? (
              <>Resend code in <Text style={styles.resendTimer}>{countdown}s</Text></>
            ) : (
              <Text>Didn't get a code? <Text style={styles.resendLink} onPress={handleResend}>Resend</Text></Text>
            )}
          </Text>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={() => {
            const codeStr = code.join("");
            if (codeStr.length === CODE_LENGTH) {
              handleVerify(codeStr);
            } else {
              Alert.alert("Incomplete", "Please enter all 6 digits.");
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity
          onPress={() => router.push("/auth/complete-profile")}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: { marginBottom: 20 },
  backButtonText: { fontSize: 16, color: "#ff6b35", fontWeight: "600" },
  header: { alignItems: "center", marginBottom: 48 },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", color: "#1a1a2e" },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a2e",
    backgroundColor: "#f8f9fa",
  },
  otpInputFilled: {
    borderColor: "#ff6b35",
    backgroundColor: "#fff5f0",
  },
  resendContainer: { alignItems: "center", marginBottom: 40 },
  resendText: { fontSize: 14, color: "#6c757d" },
  resendTimer: { color: "#ff6b35", fontWeight: "600" },
  resendLink: { color: "#ff6b35", fontWeight: "600" },
  verifyButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  verifyButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  skipButton: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  skipText: { fontSize: 14, color: "#6c757d" },
});
