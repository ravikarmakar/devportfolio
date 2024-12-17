import { create } from "zustand";
import { SkillCategory, Skill } from "../types";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

interface SkillState {
  Categories: SkillCategory[];
  Skills: Skill[];
  isLoading: boolean;
  error: string | null;
  deleteCategory: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  updateCategory: (id: string, updatedData: any) => Promise<void>;
  addCategory: (formDara: any) => void;
  updateSkill: (id: string, updatedData: any) => Promise<void>;
  addSkill: (formData: any) => void;
  fetchSkills: () => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
}

export const useSkillStore = create<SkillState>((set, get) => ({
  Categories: [],
  Skills: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/skills/categories");
      set({ Categories: response.data });
    } catch (error: any) {
      set({ error: "Failed to fetch skill categories", isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/skills");
      set({ Skills: response.data });
    } catch (error: any) {
      set({ error: "Failed to fetch skills", isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addSkill: async (formData: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/admin/skill", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Skill added successfully");

        await Promise.all([get().fetchCategories(), get().fetchSkills()]);
      }
    } catch (error: any) {
      set({ error: "Failed to add skill" });
      toast.error(
        "Failed to add Skills: " + (error?.message || "Unknown error")
      );
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (formData: any) => {
    try {
      if (!formData.title) {
        toast.error("Category title is required.");
        return;
      }

      const response = await axiosInstance.post("admin/category", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Category added successfully");
        await get().fetchCategories();
      }
    } catch (error: any) {
      set({ error: "Failed to add category" });
      toast.error(
        "Failed to add category" + (error?.message || "Unknown error")
      );
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/category/${id}`);
      toast.success("Category deleted successfully");
      await get().fetchCategories();
    } catch (error: any) {
      set({ error: "Failed to delete category" });
      toast.error("Failed to delete category", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSkill: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/skill/${id}`);
      toast.success("Skill deleted successfully");
      await get().fetchSkills();
    } catch (error: any) {
      set({ error: "Failed to delete skill" });
      toast.error("Failed to delete skill", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (id: string, updatedData: any) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put(`/admin/category/${id}`, updatedData);
      toast.success("Category updated successfully");
      await get().fetchCategories();
    } catch (error: any) {
      set({ error: "Failed to update category" });
      toast.error("Failed to update category", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSkill: async (id: string, updatedData: any) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put(`/admin/skill/${id}`, updatedData);
      toast.success("Skill updated successfully");
      await get().fetchSkills();
    } catch (error: any) {
      set({ error: "Failed to update skill" });
      toast.error("Failed to update skill", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
