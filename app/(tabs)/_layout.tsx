/**
 * Tabs Layout — Bottom tab navigator with 5 tabs:
 * Home (Feed), Post Craving, Matches, Chat, Profile.
 */
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#ff6b35",
        tabBarInactiveTintColor: "#6c757d",
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Text style={{ fontSize: 22 }}>🍽️</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="craving"
        options={{
          title: "Post",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Text style={{ fontSize: 22 }}>➕</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Text style={{ fontSize: 22 }}>🎯</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Text style={{ fontSize: 22 }}>💬</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Text style={{ fontSize: 22 }}>👤</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    height: 65,
    paddingBottom: 8,
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  tabIcon: {
    width: 28,
    height: 28,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerActive: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
