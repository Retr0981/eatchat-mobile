/**
 * Craving Detail Screen — Full detail view for a single craving post.
 * Shows the poster's profile, food details, location, time remaining,
 * and a "Match" button to express interest.
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockCravings } from "@/lib/mockData";
import type { Craving } from "@/types";

export default function CravingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the craving (in real app, fetch from Supabase)
  const craving: Craving | undefined = mockCravings.find((c) => c.id === id);
  if (!craving) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>Craving not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatExpiry = () => {
    const remaining = new Date(craving.expires_at).getTime() - Date.now();
    if (remaining <= 0) return "Expired";
    const hrs = Math.floor(remaining / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    if (hrs > 0) return `${hrs}h ${mins}m left`;
    return `${mins}m left`;
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} minutes ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hours ago`;
  };

  const handleMatch = () => {
    Alert.alert(
      "Match Request Sent! 🎉",
      `You expressed interest in ${craving.user.name}'s ${craving.food_type} craving. We'll let you know when it's a match!`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const handleChat = () => {
    Alert.alert("Coming Soon", "Chat will be available once the match is accepted.");
  };

  const getFoodEmoji = () => {
    const emojiMap: Record<string, string> = {
      pizza: "🍕", sushi: "🍣", tacos: "🌮", burger: "🍔", ramen: "🍜",
      dessert: "🧁", coffee: "☕", thai: "🥘", indian: "🍛", bbq: "🥩",
      salad: "🥗", breakfast: "🥞", other: "🍽️",
    };
    return emojiMap[craving.food_category] || "🍽️";
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Food Hero */}
        <View style={styles.foodHero}>
          <Text style={styles.foodEmoji}>{getFoodEmoji()}</Text>
          <Text style={styles.foodType}>{craving.food_type}</Text>
        </View>

        {/* Poster */}
        <View style={styles.posterCard}>
          <View style={styles.posterInfo}>
            <View style={styles.posterAvatar}>
              <Text style={styles.posterAvatarEmoji}>{craving.user.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.posterName}>{craving.user.name}</Text>
              <Text style={styles.posterBio}>{craving.user.bio}</Text>
            </View>
          </View>
          <View style={styles.posterStats}>
            <Text style={styles.statText}>📍 {craving.location.city}</Text>
            <Text style={styles.statText}>🕐 {formatTimeAgo(craving.created_at)}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What They're Craving</Text>
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{craving.description}</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailEmoji}>📍</Text>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{craving.location.city}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailEmoji}>⏰</Text>
            <Text style={styles.detailLabel}>Time Left</Text>
            <Text style={[styles.detailValue, { color: "#ff6b35" }]}>{formatExpiry()}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailEmoji}>🏷️</Text>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{craving.food_category}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailEmoji}>⏳</Text>
            <Text style={styles.detailLabel}>Expires In</Text>
            <Text style={styles.detailValue}>{craving.expiry}</Text>
          </View>
        </View>

        {/* Food Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Their Food Preferences</Text>
          <View style={styles.preferencesRow}>
            {craving.user.food_preferences.map((pref) => (
              <View key={pref} style={styles.preferenceChip}>
                <Text style={styles.preferenceText}>{pref}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.matchButton} onPress={handleMatch} activeOpacity={0.8}>
            <Text style={styles.matchButtonText}>🎯 I Want This Too! Match Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat} activeOpacity={0.8}>
            <Text style={styles.chatButtonText}>💬 Message Them</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 32 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 16, color: "#ff6b35", fontWeight: "600" },
  foodHero: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#fff5f0",
    borderRadius: 16,
    marginBottom: 20,
  },
  foodEmoji: { fontSize: 64, marginBottom: 8 },
  foodType: { fontSize: 28, fontWeight: "800", color: "#1a1a2e" },
  posterCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  posterInfo: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  posterAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  posterAvatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  posterName: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  posterBio: { fontSize: 12, color: "#6c757d", marginTop: 2 },
  posterStats: { alignItems: "flex-end", gap: 4 },
  statText: { fontSize: 12, color: "#6c757d" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1a1a2e", marginBottom: 12 },
  descriptionCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
  },
  descriptionText: { fontSize: 16, color: "#1a1a2e", lineHeight: 24 },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  detailCard: {
    width: "47%",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  detailEmoji: { fontSize: 24 },
  detailLabel: { fontSize: 12, color: "#6c757d" },
  detailValue: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  preferencesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  preferenceChip: {
    backgroundColor: "#fff5f0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ff6b35",
  },
  preferenceText: { fontSize: 14, color: "#ff6b35", fontWeight: "600" },
  actions: { gap: 12 },
  matchButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  matchButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  chatButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  chatButtonText: { color: "#1a1a2e", fontSize: 16, fontWeight: "600" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorEmoji: { fontSize: 48, marginBottom: 12 },
  errorText: { fontSize: 18, color: "#6c757d" },
  errorButton: {
    marginTop: 16,
    backgroundColor: "#ff6b35",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  errorButtonText: { color: "#ffffff", fontWeight: "600" },
});
