/**
 * Chat Store — Manages conversations and messages using Zustand.
 * Stores chat list, current conversation messages, and unread counts.
 */
import { create } from "zustand";
import type { Conversation, Message } from "@/types";

interface ChatStore {
  // State
  conversations: Conversation[];
  currentMessages: Message[];
  activeConversationId: string | null;
  isLoading: boolean;

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  setCurrentMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  markAsRead: (conversationId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  currentMessages: [],
  activeConversationId: null,
  isLoading: false,

  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (activeConversationId) =>
    set({ activeConversationId, currentMessages: [] }),
  setCurrentMessages: (currentMessages) => set({ currentMessages }),
  addMessage: (message) =>
    set((state) => ({
      currentMessages: [...state.currentMessages, message],
    })),
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unread_count: 0 } : c
      ),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
