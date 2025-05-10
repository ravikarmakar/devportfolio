import React, { createContext, useContext, useState, useEffect } from "react";
import { BlogPost, ResourceItem } from "../type/blog";
import { mockBlogPosts, mockResources } from "../../../lib/Context";

interface BlogContextType {
  posts: BlogPost[];
  resources: ResourceItem[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  loading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In real app, replace with actual API calls
        setPosts(mockBlogPosts);
        setResources(mockResources);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        resources,
        selectedCategory,
        setSelectedCategory,
        loading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
