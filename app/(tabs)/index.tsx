/**
 * Home / Feed Screen — Shows nearby cravings in map or list view.
 * Toggle between map and list. Cards show food type, distance, time, user.
 */
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCravingStore } from "@/stores/cravingStore";
import { mockCravings } from "@/lib/mockData";
import type { Craving } from "@/types";

export default function FeedScreen() {
  const router = useRouter();
  const { cravings, setCravings, isMapView, toggleMapView } = useCravingStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load mock data on mount
  useEffect(() => {
    setCravings(mockCravings);
  }, []);

  const filteredCravings = cravings.filter(
    (c) => !selectedCategory || c.food_category === selectedCategory
  );

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  };

  const formatExpiry = (craving: Craving) => {
    const remaining = new Date(craving.expires_at).getTime() - Date.now();
    if (remaining <= 0) return "Expired";
    const hrs = Math.floor(remaining / 3600000);
    return `${hrs}h left`;
  };

  const categories = ["All", "pizza", "sushi", "tacos", "burger", "ramen", "dessert", "coffee", "indian", "thai", "bbq"];
  const categoryEmojis: Record<string, string> = {
    All: "🍽️", pizza: "🍕", sushi: "🍣", tacos: "🌮", burger: "🍔",
    ramen: "🍜", dessert: "🧁", coffee: "☕", indian: "🍛", thai: "🥘", bbq: "🥩",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🍔</Text>
          <View style={styles.headerRight}>
            <Text style={styles.location}>📍 New York</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>🔍 Search cravings...</Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                (cat === "All" && !selectedCategory) || selectedCategory === cat
                  ? styles.categoryChipActive
                  : null,
              ]}
              onPress={() => setSelectedCategory(cat === "All" ? null : cat)}
            >
              <Text style={styles.categoryEmoji}>{categoryEmojis[cat]}</Text>
              <Text
                style={[
                  styles.categoryLabel,
                  (cat === "All" && !selectedCategory) || selectedCategory === cat
                    ? styles.categoryLabelActive
                    : null,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, isMapView && styles.toggleButtonActive]}
            onPress={() => { if (!isMapView) toggleMapView(); }}
          >
            <Text style={styles.toggleText}>🗺️ Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isMapView && styles.toggleButtonActive]}
            onPress={() => { if (isMapView) toggleMapView(); }}
          >
            <Text style={styles.toggleText}>📋 List</Text>
          </TouchableOpacity>
        </View>

        {isMapView ? (
          /* Map Placeholder */
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderEmoji}>🗺️</Text>
            <Text style={styles.mapPlaceholderText}>Map View</Text>
            <Text style={styles.mapPlaceholderSubtext}>
              React Native Maps will show nearby cravings here
            </Text>
            <Text style={styles.mapPlaceholderCount}>
              {filteredCravings.length} cravings nearby
            </Text>
          </View>
        ) : (
          /* Cravings List */
          <FlatList
            data={filteredCravings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cravingsList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cravingCard}
                onPress={() => router.push(`/craving/${item.id}`)}
                activeOpacity={0.8}
              >
                <View style={styles.cravingHeader}>
                  <View style={styles.cravingUser}>
                    <View style={styles.cravingAvatar}>
                      <Text style={styles.cravingAvatarEmoji}>
                        {item.user.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.cravingUserName}>{item.user.name}</Text>
                      <Text style={styles.cravingTime}>{formatTimeAgo(item.created_at)}</Text>
                    </View>
                  </View>
                  <View style={styles.cravingExpiry}>
                    <Text style={styles.cravingExpiryText}>{formatExpiry(item)}</Text>
                  </View>
                </View>
                <Text style={styles.cravingFoodEmoji}>
                  {item.food_category === "pizza" ? "🍕" : item.food_category === "sushi" ? "🍣" : item.food_category === "tacos" ? "🌮" : item.food_category === "burger" ? "🍔" : item.food_category === "ramen" ? "🍜" : item.food_category === "dessert" ? "🧁" : item.food_category === "coffee" ? "☕" : item.food_category === "indian" ? "🍛" : item.food_category === "thai" ? "🥘" : item.food_category === "bbq" ? "🥩" : "🍽️"}
                </Text>
                <Text style={styles.cravingDescription}>{item.description}</Text>
                <View style={styles.cravingFooter}>
                  <Text style={styles.cravingType}>📍 {item.location.city}</Text>
                  <Text style={styles.cravingCategory}>#{item.food_type}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: { fontSize: 28 },
  headerRight: { alignItems: "flex-end" },
  location: { fontSize: 14, color: "#6c757d" },
  searchBar: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  searchPlaceholder: { fontSize: 16, color: "#adb5bd" },
  categories: { marginBottom: 12 },
  categoriesContent: { gap: 8, paddingRight: 20 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "#f8f9fa",
  },
  categoryChipActive: {
    backgroundColor: "#fff5f0",
    borderWidth: 1,
    borderColor: "#ff6b35",
  },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: { fontSize: 13, color: "#6c757d", fontWeight: "500" },
  categoryLabelActive: { color: "#ff6b35", fontWeight: "700" },
  viewToggle: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  toggleButtonActive: {
    backgroundColor: "#ff6b35",
  },
  toggleText: { fontSize: 14, fontWeight: "600", color: "#1a1a2e" },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
  },
  mapPlaceholderEmoji: { fontSize: 48, marginBottom: 8 },
  mapPlaceholderText: { fontSize: 20, fontWeight: "700", color: "#1a1a2e" },
  mapPlaceholderSubtext: { fontSize: 14, color: "#6c757d", marginTop: 4 },
  mapPlaceholderCount: { fontSize: 16, color: "#ff6b35", fontWeight: "600", marginTop: 12 },
  cravingsList: { gap: 12, paddingBottom: 20 },
  cravingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cravingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cravingUser: { flexDirection: "row", alignItems: "center", gap: 10 },
  cravingAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  cravingAvatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
  cravingUserName: { fontSize: 14, fontWeight: "700", color: "#1a1a2e" },
  cravingTime: { fontSize: 12, color: "#6c757d" },
  cravingExpiry: {
    backgroundColor: "#fff5f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  cravingExpiryText: { fontSize: 12, color: "#ff6b35", fontWeight: "600" },
  cravingFoodEmoji: { fontSize: 32, marginBottom: 4 },
  cravingDescription: { fontSize: 14, color: "#1a1a2e", lineHeight: 20, marginBottom: 8 },
  cravingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 8,
  },
  cravingType: { fontSize: 12, color: "#6c757d" },
  cravingCategory: { fontSize: 12, color: "#ff6b35", fontWeight: "600" },
});
