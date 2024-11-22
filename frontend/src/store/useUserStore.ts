import { create } from "zustand";
import { User } from "../types";
import { axiosInstance } from "../lib/axios";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
}

const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUserData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      const userData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
      set({ user: userData, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch user data", isLoading: false });
    }
  },
}));

export default useUserStore;
