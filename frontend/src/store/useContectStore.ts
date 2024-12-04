import { create } from "zustand";
import { Message } from "../types";
import { axiosInstance } from "../lib/axios";

interface ContactStoreState {
  messages: Message[] | null;
  error: string | null;
  isLoading: boolean;
  fetchAllMessage: () => Promise<void>;
  markAsRead: (id: string) => Promise<Message | null>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useContactStore = create<ContactStoreState>((set) => ({
  messages: null,
  error: null,
  isLoading: false,

  fetchAllMessage: async () => {
    set({ isLoading: true, error: null });
    const response = await axiosInstance("/message");
    set({ messages: response.data, isLoading: false });
    try {
    } catch (error: any) {
      set({ error: "Failed to fetch message", isLoading: false });
    }
  },

  markAsRead: async (_id: string) => {
    try {
      const response = await axiosInstance.put(`/message/${_id}/read`, {
        read: true,
      });
      if (response.status === 200) {
        return response.data.data; // Return updated message
      }
      return null;
    } catch (error) {
      console.error("Error marking message as read:", error);
      return null;
    }
  },

  deleteMessage: async (_id: string) => {},
}));
