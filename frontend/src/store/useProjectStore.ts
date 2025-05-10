import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  details: string;
  liveLink: string;
  sourceLink: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectStoreState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchAllProjects: () => Promise<void>;
  createProject: (projectData: FormData) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  fetchProjectDetails: (id: string) => Promise<Project | null>;
  updateProject: (id: string, projectData: FormData) => Promise<Project | null>;
  fetchFeaturedProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchAllProjects: async () => {
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
      const response = await axiosInstance.post(
        "/projects/create",
        projectData
      );
      set({ isLoading: false });
      return response.data.project;
    } catch (error) {
      set({ error: "Error in creating projects", isLoading: false });
      return null;
    }
  },
  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/projects/${id}`);
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: "Failed to delete project", isLoading: false });
      return false;
    }
  },
  updateProject: async (id: string, projectData: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/projects/${id}`, projectData);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: "Failed to update project", isLoading: false });
      return null;
    }
  },
  fetchProjectDetails: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: "Failed to fetct project details", isLoading: false });
      return null;
    }
  },
  fetchFeaturedProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/projects/featured-projects");
      set({ projects: response.data.project, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch featured project", isLoading: false });
    }
  },
}));
