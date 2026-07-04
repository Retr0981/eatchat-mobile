/**
 * Chat Room Screen — 1-on-1 real-time messaging with a matched user.
 * Shows message bubbles, text input, photo button, and "Suggest Meet" action.
 * Ready for WebSocket/Supabase Realtime integration.
 */
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useChatStore } from "@/stores/chatStore";
import { mockMessages, mockUsers } from "@/lib/mockData";

export default function ChatRoomScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentMessages, setCurrentMessages, addMessage, setActiveConversation } = useChatStore();
  const [inputText, setInputText] = useState("");

  const otherUser = mockUsers[0]; // In a real app, fetch from the conversation

  useEffect(() => {
    setActiveConversation(id || null);
    // Load mock messages for this conversation
    setCurrentMessages(mockMessages);
  }, [id]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: id || "conv-1",
      sender_id: "user-1", // Current user
      content: inputText.trim(),
      created_at: new Date().toISOString(),
    };

    addMessage(newMessage);
    setInputText("");

    // TODO: Replace with Supabase Realtime subscription
    // Simulate a reply after a short delay
    setTimeout(() => {
      const reply = {
        id: `msg-reply-${Date.now()}`,
        conversation_id: id || "conv-1",
        sender_id: otherUser.id,
        content: getAutoReply(inputText.trim()),
        created_at: new Date().toISOString(),
      };
      addMessage(reply);
    }, 1500);
  };

  const getAutoReply = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("time") || lower.includes("when")) return "How about 7pm? 🕐";
    if (lower.includes("where") || lower.includes("place")) return "Let's try that new place downtown! 📍";
    if (lower.includes("sounds") || lower.includes("sure") || lower.includes("great")) return "Awesome! Can't wait! 🎉";
    return "Haha, totally agree! So what time works for you? 😄";
  };

  const isMyMessage = (senderId: string) => senderId === "user-1";

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerUser}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarEmoji}>{otherUser.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.headerName}>{otherUser.name}</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.meetButton}
            onPress={() => {
              // TODO: Navigate to suggest meet flow
            }}
          >
            <Text style={styles.meetButtonText}>🍽️ Meet</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={currentMessages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const mine = isMyMessage(item.sender_id);
            return (
              <View
                style={[styles.messageRow, mine ? styles.messageRowMine : styles.messageRowTheirs]}
              >
                {!mine && (
                  <View style={styles.msgAvatar}>
                    <Text style={styles.msgAvatarEmoji}>{otherUser.name.charAt(0)}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.bubble,
                    mine ? styles.bubbleMine : styles.bubbleTheirs,
                  ]}
                >
                  <Text style={[styles.bubbleText, mine ? styles.bubbleTextMine : styles.bubbleTextTheirs]}>
                    {item.content}
                  </Text>
                  <Text style={[styles.bubbleTime, mine ? styles.bubbleTimeMine : styles.bubbleTimeTheirs]}>
                    {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={() => {
              // TODO: Photo picker integration
            }}
          >
            <Text style={styles.photoButtonEmoji}>📷</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  keyboardAvoid: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: { marginRight: 12 },
  backText: { fontSize: 24, color: "#ff6b35" },
  headerUser: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
  headerName: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  headerStatus: { fontSize: 12, color: "#00b894" },
  meetButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  meetButtonText: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  messagesList: { padding: 16, gap: 12, paddingBottom: 8 },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    maxWidth: "80%",
  },
  messageRowMine: { alignSelf: "flex-end" },
  messageRowTheirs: { alignSelf: "flex-start" },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  msgAvatarEmoji: { color: "#ffffff", fontWeight: "700", fontSize: 11 },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMine: {
    backgroundColor: "#ff6b35",
    borderBottomRightRadius: 4,
  },
  bubbleTheirs: {
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextMine: { color: "#ffffff" },
  bubbleTextTheirs: { color: "#1a1a2e" },
  bubbleTime: { fontSize: 10, marginTop: 4 },
  bubbleTimeMine: { color: "rgba(255,255,255,0.6)", textAlign: "right" },
  bubbleTimeTheirs: { color: "#adb5bd" },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    backgroundColor: "#ffffff",
  },
  photoButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photoButtonEmoji: { fontSize: 22 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    color: "#1a1a2e",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: { backgroundColor: "#ff6b35" },
  sendButtonInactive: { backgroundColor: "#e9ecef" },
  sendButtonText: { fontSize: 18, color: "#ffffff", fontWeight: "700" },
});
