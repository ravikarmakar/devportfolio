import { create } from "zustand";
import { SkillCategory } from "../types";
import { axiosInstance } from "../lib/axios";

interface SkillState {
  skillCategories: SkillCategory[];
  isLoading: boolean;
  error: string | null;
  fetchSkillCategories: () => Promise<void>;
}

export const useSkillStore = create<SkillState>((set) => ({
  skillCategories: [],
  isLoading: false,
  error: null,
  fetchSkillCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/skills");
      set({ skillCategories: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch skill categories", isLoading: false });
    }
  },
}));
