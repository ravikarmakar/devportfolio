import { create } from "zustand";
import { Message } from "../types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface ContactStoreState {
  messages: Message[] | null;
  error: string | null;
  isLoading: boolean;
  sendMessage: (formData: any) => Promise<void>;
  fetchAllMessage: () => Promise<void>;
  markAsRead: (id: string) => Promise<Message | null>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useContactStore = create<ContactStoreState>((set, get) => ({
  messages: null,
  error: null,
  isLoading: false,

  sendMessage: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/message/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Message sent successfully!");
        await get().fetchAllMessage();
      }
    } catch (error: any) {
      set({ error: "Failed to send message" });
      toast.error("Failed to send message: " + error.message);
    } finally {
      set({ isLoading: false });
    }
  },

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

  deleteMessage: async (_id: string) => {
    try {
      const response = await axiosInstance.delete(`/message/${_id}`);

      if (response.status === 200) {
        toast.success("Message deleted successfully");
      }
    } catch (error: any) {
      toast.error("Error deleting message:", error);
    }
  },
}));
