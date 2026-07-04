/**
 * Post Craving Screen — Create a new food craving post.
 * Pick food category, write description, set location, choose expiry.
 */
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_CATEGORY_CONFIG, type FoodCategory, type CravingExpiry } from "@/types";

export default function PostCravingScreen() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState<CravingExpiry>("4h");

  const handlePost = () => {
    if (!selectedCategory) {
      Alert.alert("Pick a Food", "What are you craving? Select a food category!");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Add Details", "Tell people what you're craving!");
      return;
    }
    // TODO: Save to Supabase
    Alert.alert("Craving Posted! 🎉", "We're matching you with nearby foodies now.");
    setDescription("");
    setSelectedCategory(null);
    setExpiry("4h");
  };

  const categories = Object.entries(FOOD_CATEGORY_CONFIG) as [
    FoodCategory,
    { emoji: string; label: string }
  ][];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What are you craving?</Text>
          <Text style={styles.subtitle}>
            Pick a food, describe it, and we'll find someone nearby who wants the same!
          </Text>
        </View>

        {/* Food Category Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Craving</Text>
          <View style={styles.categoryGrid}>
            {categories.map(([category, config]) => {
              const isSelected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryEmoji}>{config.emoji}</Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelSelected,
                    ]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe Your Craving</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="I'm dying for some authentic tonkotsu ramen with extra chashu..."
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={300}
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{description.length}/300</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={styles.locationCard}
            onPress={() => Alert.alert("Location", "Map picker coming soon!")}
          >
            <Text style={styles.locationEmoji}>📍</Text>
            <View>
              <Text style={styles.locationText}>Current Location</Text>
              <Text style={styles.locationSubtext}>New York, NY (auto-detected)</Text>
            </View>
            <Text style={styles.locationArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Expiry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How long is this craving active?</Text>
          <View style={styles.expiryOptions}>
            {([
              { value: "1h", label: "1 Hour", emoji: "⚡" },
              { value: "4h", label: "4 Hours", emoji: "🕐" },
              { value: "24h", label: "24 Hours", emoji: "📅" },
            ] as const).map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.expiryCard,
                  expiry === option.value && styles.expiryCardSelected,
                ]}
                onPress={() => setExpiry(option.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.expiryEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.expiryLabel,
                    expiry === option.value && styles.expiryLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Photo Upload */}
        <TouchableOpacity
          style={styles.photoUpload}
          onPress={() => Alert.alert("Upload", "Photo upload coming soon!")}
        >
          <Text style={styles.photoUploadEmoji}>📷</Text>
          <Text style={styles.photoUploadText}>Add a food photo (optional)</Text>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>Post Craving 🍔</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "800", color: "#1a1a2e" },
  subtitle: { fontSize: 14, color: "#6c757d", marginTop: 4, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1a1a2e", marginBottom: 12 },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    gap: 4,
  },
  categoryCardSelected: {
    borderColor: "#ff6b35",
    backgroundColor: "#fff5f0",
  },
  categoryEmoji: { fontSize: 28 },
  categoryLabel: { fontSize: 12, color: "#6c757d", fontWeight: "500" },
  categoryLabelSelected: { color: "#ff6b35", fontWeight: "700" },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1a1a2e",
    backgroundColor: "#f8f9fa",
    minHeight: 100,
  },
  charCount: { fontSize: 12, color: "#adb5bd", textAlign: "right", marginTop: 4 },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  locationEmoji: { fontSize: 24 },
  locationText: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
  locationSubtext: { fontSize: 12, color: "#6c757d" },
  locationArrow: { fontSize: 20, color: "#adb5bd", marginLeft: "auto" },
  expiryOptions: { flexDirection: "row", gap: 12 },
  expiryCard: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  expiryCardSelected: {
    borderColor: "#ff6b35",
    backgroundColor: "#fff5f0",
  },
  expiryEmoji: { fontSize: 24 },
  expiryLabel: { fontSize: 14, color: "#6c757d", fontWeight: "500" },
  expiryLabelSelected: { color: "#ff6b35", fontWeight: "700" },
  photoUpload: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
    marginBottom: 24,
  },
  photoUploadEmoji: { fontSize: 24 },
  photoUploadText: { fontSize: 14, color: "#6c757d" },
  postButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  postButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
});
