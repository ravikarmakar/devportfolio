import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/user", {
          withCredentials: true, // Ensures cookies are sent
        });

        if (response.data.role === "admin") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        console.error("Authentication check failed:", error.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>; // Improved UX
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
