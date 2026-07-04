/**
 * Complete Profile Screen — After signup, user sets up their profile:
 * avatar, bio, and food preferences. Then enters the main app.
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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_CATEGORY_CONFIG, type FoodCategory } from "@/types";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<Set<string>>(
    new Set()
  );

  const togglePreference = (category: FoodCategory) => {
    setSelectedPreferences((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleComplete = () => {
    if (selectedPreferences.size === 0) {
      Alert.alert(
        "Pick Some Favorites",
        "Select at least one food preference so we can match you better!"
      );
      return;
    }
    // TODO: Save profile to Supabase
    router.replace("/(tabs)");
  };

  const categories = Object.entries(FOOD_CATEGORY_CONFIG) as [
    FoodCategory,
    { emoji: string; label: string }
  ][];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Set Up Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell us about your food personality
          </Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={require("@assets/icon.png")}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={() => Alert.alert("Upload", "Photo upload coming soon!")}
          >
            <Text style={styles.changeAvatarText}>Add Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About You</Text>
          <TextInput
            style={styles.bioInput}
            placeholder="I'm a foodie who loves exploring new restaurants 🍕✈️"
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={150}
            numberOfLines={3}
          />
          <Text style={styles.charCount}>{bio.length}/150</Text>
        </View>

        {/* Food Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Preferences</Text>
          <Text style={styles.sectionHint}>
            Pick your favorites — we'll use these to find better matches
          </Text>
          <View style={styles.preferencesGrid}>
            {categories.map(([category, config]) => {
              const isSelected = selectedPreferences.has(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.preferenceChip,
                    isSelected && styles.preferenceChipSelected,
                  ]}
                  onPress={() => togglePreference(category)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.preferenceEmoji}>{config.emoji}</Text>
                  <Text
                    style={[
                      styles.preferenceLabel,
                      isSelected && styles.preferenceLabelSelected,
                    ]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>Start Craving! 🍔</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Set up later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  header: { alignItems: "center", marginBottom: 32 },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", color: "#1a1a2e" },
  subtitle: { fontSize: 16, color: "#6c757d", marginTop: 4 },
  avatarContainer: { alignItems: "center", marginBottom: 32 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ff6b35",
  },
  avatarImage: { width: 60, height: 60 },
  changeAvatarButton: { marginTop: 12 },
  changeAvatarText: { fontSize: 14, color: "#ff6b35", fontWeight: "600" },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  sectionHint: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 16,
    lineHeight: 20,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1a1a2e",
    backgroundColor: "#f8f9fa",
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: { fontSize: 12, color: "#adb5bd", textAlign: "right", marginTop: 4 },
  preferencesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  preferenceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  preferenceChipSelected: {
    borderColor: "#ff6b35",
    backgroundColor: "#fff5f0",
  },
  preferenceEmoji: { fontSize: 18 },
  preferenceLabel: { fontSize: 14, color: "#1a1a2e", fontWeight: "500" },
  preferenceLabelSelected: { color: "#ff6b35", fontWeight: "700" },
  completeButton: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  completeButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  skipButton: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  skipText: { fontSize: 14, color: "#6c757d" },
});
