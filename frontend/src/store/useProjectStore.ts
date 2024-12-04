import { create } from "zustand";
import { Project } from "../types";
import { axiosInstance } from "../lib/axios";

interface ProjectStoreState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/projects");
      set({ projects: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch projects", isLoading: false });
    }
  },
}));
