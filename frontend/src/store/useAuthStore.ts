import { create } from "zustand";
import { AuthUser } from "../types";
import { axiosInstance } from "../lib/axios";

interface AuthStoreState {
  authUser: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  fetchAuthUserData: () => Promise<void>;
}

export const authUserStore = create<AuthStoreState>((set) => ({
  authUser: null,
  isLoading: false,
  error: null,

  logout: () => set({ authUser: null, isLoading: false, error: null }),

  fetchAuthUserData: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/auth/user");
      set({ authUser: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch user data", isLoading: false });
    }
  },
}));
