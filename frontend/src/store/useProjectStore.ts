import { create } from "zustand";
import { Project } from "../types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface ProjectStoreState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (projectData: any) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, updatedData: any) => Promise<void>;
}

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
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

  createProject: async (projectData) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();
      formData.append("title", projectData.title);
      projectData.technologies.forEach((tech: string) => {
        formData.append("technologies[]", tech);
      });
      projectData.tags.forEach((tag: string) => {
        formData.append("tags[]", tag);
      });
      formData.append("links", JSON.stringify(projectData.links));
      formData.append("priority", projectData.priority);
      formData.append("status", projectData.status);
      formData.append("description", projectData.description);
      if (projectData.image) {
        formData.append("image", projectData.image);
      }

      await axiosInstance.post("/admin/project", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project added successfully");
      await get().fetchProjects();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add project";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/project/${id}`);
      toast.success("Project deleted successfully");

      await get().fetchProjects();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete project";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id: string, updatedData: any) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put(`/admin/project/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Project updated successfully");

      await get().fetchProjects();

      // Optionally, you can use the response to update local state or trigger additional actions
      // For example: set({ projects: response.data.data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update project";

      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
