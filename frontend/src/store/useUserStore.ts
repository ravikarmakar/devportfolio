import { create } from "zustand";
import { User } from "../types";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  updateUser: (formData: any) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
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

  updateUser: async (formData: any) => {
    const userId = "6749c8e440149cf95c21589a";
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.put(
        `/admin/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({ user: response.data });
      if (response.status === 200) {
        toast.success("User updated successfully");
        await get().fetchUserData();
      }
    } catch (error: any) {
      set({ error: "Failed to update user data" });
      toast.error("Failed to update user data", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
