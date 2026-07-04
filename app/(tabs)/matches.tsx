/**
 * Matches Screen — Shows active and pending match cards.
 * Each card displays the matched user, shared craving, and status.
 */
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatchStore } from "@/stores/matchStore";
import { mockMatches } from "@/lib/mockData";

export default function MatchesScreen() {
  const router = useRouter();
  const { matches, setMatches } = useMatchStore();
  const [filter, setFilter] = useState<"all" | "accepted" | "pending">("all");

  useEffect(() => {
    setMatches(mockMatches);
  }, []);

  const filteredMatches = matches.filter((m) =>
    filter === "all" ? true : m.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#00b894";
      case "pending": return "#f7c948";
      case "declined": return "#e74c3c";
      case "completed": return "#6c757d";
      default: return "#6c757d";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "accepted": return "✅ Accepted";
      case "pending": return "⏳ Pending";
      case "declined": return "❌ Declined";
      case "completed": return "🍽️ Completed";
      default: return status;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Matches</Text>
          <Text style={styles.subtitle}>
            {matches.length} {matches.length === 1 ? "match" : "matches"}
          </Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {(["all", "accepted", "pending"] as const).map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                filter === f && styles.filterChipActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterLabel,
                  filter === f && styles.filterLabelActive,
                ]}
              >
                {f === "all" ? "All" : f === "accepted" ? "Accepted" : "Pending"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyTitle}>No matches yet</Text>
            <Text style={styles.emptyText}>
              Post a craving and we'll find your foodie match!
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => router.push("/(tabs)/craving")}
            >
              <Text style={styles.emptyButtonText}>Post a Craving</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredMatches}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.matchesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.matchCard}
                onPress={() => router.push(`/chat/${item.id}`)}
                activeOpacity={0.8}
              >
                {/* User Info */}
                <View style={styles.matchHeader}>
                  <View style={styles.matchAvatar}>
                    <Text style={styles.matchAvatarEmoji}>
                      {item.matched_user.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.matchUserInfo}>
                    <Text style={styles.matchName}>{item.matched_user.name}</Text>
                    <Text style={styles.matchBio}>{item.matched_user.bio}</Text>
                  </View>
                  <View
                    style={[
                      styles.matchStatus,
                      { backgroundColor: getStatusColor(item.status) + "20" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.matchStatusLabel,
                        { color: getStatusColor(item.status) },
                      ]}
                    >
                      {getStatusLabel(item.status)}
                    </Text>
                  </View>
                </View>

                {/* Shared Craving */}
                <View style={styles.matchCraving}>
                  <Text style={styles.matchCravingEmoji}>
                    {item.craving.food_category === "pizza" ? "🍕" : item.craving.food_category === "sushi" ? "🍣" : item.craving.food_category === "tacos" ? "🌮" : item.craving.food_category === "ramen" ? "🍜" : "🍽️"}
                  </Text>
                  <Text style={styles.matchCravingText}>
                    Both craving: <Text style={styles.cravingBold}>{item.craving.food_type}</Text>
                  </Text>
                </View>

                {/* Action */}
                <View style={styles.matchFooter}>
                  <Text style={styles.matchTime}>
                    Matched {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => router.push(`/chat/${item.id}`)}
                  >
                    <Text style={styles.chatButtonText}>💬 Chat</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "800", color: "#1a1a2e" },
  subtitle: { fontSize: 14, color: "#6c757d", marginTop: 2 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "#f8f9fa",
  },
  filterChipActive: { backgroundColor: "#ff6b35" },
  filterLabel: { fontSize: 14, fontWeight: "600", color: "#6c757d" },
  filterLabelActive: { color: "#ffffff" },
  matchesList: { gap: 12, paddingBottom: 20 },
  matchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  matchHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  matchAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  matchAvatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  matchUserInfo: { flex: 1 },
  matchName: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  matchBio: { fontSize: 12, color: "#6c757d", marginTop: 2 },
  matchStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999 },
  matchStatusLabel: { fontSize: 11, fontWeight: "600" },
  matchCraving: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  matchCravingEmoji: { fontSize: 20 },
  matchCravingText: { fontSize: 14, color: "#1a1a2e" },
  cravingBold: { fontWeight: "700", color: "#ff6b35" },
  matchFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
  matchTime: { fontSize: 12, color: "#adb5bd" },
  chatButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  chatButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#1a1a2e" },
  emptyText: { fontSize: 14, color: "#6c757d", textAlign: "center", marginTop: 4 },
  emptyButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    marginTop: 20,
  },
  emptyButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
