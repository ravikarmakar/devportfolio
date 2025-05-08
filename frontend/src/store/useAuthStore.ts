import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthStoreState {
  authUser: User | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      authUser: null,
      user: null,
      isLoading: false,
      error: null,

      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get("/auth/check-auth");
          set({ authUser: response.data.user, isLoading: false });
        } catch (error) {
          set({ error: "Failed to checking loggedIn", isLoading: false });
        }
      },

      login: async (username, password) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axiosInstance.post("/auth/login", {
            username,
            password,
          });
          set({
            authUser: response.data.user,
            isLoading: false,
          });
          return true;
        } catch (error) {
          set({ error: "Failed to Admin login", isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await axiosInstance.post("/auth/logout");
          set({ authUser: null, isLoading: false });
        } catch (error) {
          set({ error: "Failed to Admin logout", isLoading: false });
        }
      },

      fetchUserData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get("/auth/user-data");
          set({ user: response.data[0], isLoading: false });
        } catch (error) {
          set({ error: "Failed to fetch user data", isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
