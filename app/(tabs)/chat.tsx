/**
 * Chat List Screen — Shows all conversations with matched users.
 * Each conversation shows the matched user, last message, and unread count.
 */
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "@/stores/chatStore";
import { mockConversations } from "@/lib/mockData";

export default function ChatListScreen() {
  const router = useRouter();
  const { conversations, setConversations } = useChatStore();

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h`;
    return `${Math.floor(diffHrs / 24)}d`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
        </View>

        {/* Chat List */}
        {conversations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptyText}>
              Match with someone and start chatting!
            </Text>
          </View>
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatCard}
                onPress={() => router.push(`/chat/${item.id}`)}
                activeOpacity={0.8}
              >
                {/* Avatar */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarEmoji}>
                    {item.participants[1]?.name.charAt(0) || "?"}
                  </Text>
                </View>

                {/* Conversation Info */}
                <View style={styles.chatInfo}>
                  <View style={styles.chatInfoHeader}>
                    <Text style={styles.chatName}>
                      {item.participants[1]?.name || "Unknown"}
                    </Text>
                    <Text style={styles.chatTime}>
                      {item.last_message
                        ? formatTime(item.last_message.created_at)
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.chatInfoRow}>
                    <Text style={styles.chatPreview} numberOfLines={1}>
                      {item.last_message?.content || "No messages yet"}
                    </Text>
                    {item.unread_count > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>
                          {item.unread_count}
                        </Text>
                      </View>
                    )}
                  </View>
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
  chatList: { gap: 4, paddingBottom: 20 },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 18 },
  chatInfo: { flex: 1 },
  chatInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  chatTime: { fontSize: 12, color: "#adb5bd" },
  chatInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatPreview: {
    fontSize: 14,
    color: "#6c757d",
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#ff6b35",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#1a1a2e" },
  emptyText: { fontSize: 14, color: "#6c757d", marginTop: 4 },
});
