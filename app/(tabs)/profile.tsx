/**
 * Profile Screen — User profile with avatar, stats, food preferences,
 * settings options, and logout.
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/stores/authStore";
import { mockCurrentUser } from "@/lib/mockData";

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const user = mockCurrentUser;

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/auth");
        },
      },
    ]);
  };

  const settingsItems = [
    { icon: "🔔", label: "Notifications", value: "On" },
    { icon: "📍", label: "Location Settings", value: "" },
    { icon: "🔒", label: "Privacy & Safety", value: "" },
    { icon: "🎨", label: "Appearance", value: "Light" },
    { icon: "🌐", label: "Language", value: "English" },
    { icon: "❓", label: "Help & Support", value: "" },
    { icon: "📄", label: "Terms of Service", value: "" },
    { icon: "🔑", label: "Delete Account", value: "", destructive: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image
                source={require("@assets/icon.png")}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarText}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userBio}>{user.bio}</Text>
          <Text style={styles.userLocation}>📍 {user.location?.city || "Unknown"}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Meals Shared</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Food Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Preferences</Text>
          <View style={styles.preferencesRow}>
            {user.food_preferences.map((pref) => (
              <View key={pref} style={styles.preferenceChip}>
                <Text style={styles.preferenceText}>
                  {pref === "pizza" ? "🍕" : pref === "sushi" ? "🍣" : pref === "tacos" ? "🌮" : pref === "ramen" ? "🍜" : "🍽️"} {pref}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.editPreferencesButton}>
            <Text style={styles.editPreferencesText}>Edit Preferences →</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingsItem,
                  item.destructive && styles.settingsItemDestructive,
                ]}
                onPress={() => Alert.alert(item.label, `${item.label} settings coming soon!`)}
                activeOpacity={0.7}
              >
                <View style={styles.settingsItemLeft}>
                  <Text style={styles.settingsIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.settingsLabel,
                      item.destructive && styles.settingsLabelDestructive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.value ? (
                  <Text style={styles.settingsValue}>{item.value}</Text>
                ) : (
                  <Text style={styles.settingsArrow}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>EatChat v1.0.0</Text>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: { position: "relative", marginBottom: 12 },
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
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarText: { fontSize: 14 },
  userName: { fontSize: 24, fontWeight: "800", color: "#1a1a2e" },
  userBio: { fontSize: 14, color: "#6c757d", marginTop: 4, textAlign: "center" },
  userLocation: { fontSize: 14, color: "#adb5bd", marginTop: 4 },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  statValue: { fontSize: 24, fontWeight: "800", color: "#ff6b35" },
  statLabel: { fontSize: 12, color: "#6c757d", marginTop: 2, fontWeight: "500" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1a1a2e", marginBottom: 12 },
  preferencesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  preferenceChip: {
    backgroundColor: "#fff5f0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ff6b35",
  },
  preferenceText: { fontSize: 14, color: "#ff6b35", fontWeight: "600" },
  editPreferencesButton: { marginTop: 12 },
  editPreferencesText: { fontSize: 14, color: "#ff6b35", fontWeight: "600" },
  settingsList: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 16,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingsItemDestructive: {},
  settingsItemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsIcon: { fontSize: 18 },
  settingsLabel: { fontSize: 16, color: "#1a1a2e" },
  settingsLabelDestructive: { color: "#e74c3c" },
  settingsValue: { fontSize: 14, color: "#6c757d" },
  settingsArrow: { fontSize: 20, color: "#adb5bd" },
  logoutButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginTop: 8,
    marginBottom: 16,
  },
  logoutButtonText: { fontSize: 16, fontWeight: "700", color: "#e74c3c" },
  versionText: { textAlign: "center", fontSize: 12, color: "#adb5bd" },
});
