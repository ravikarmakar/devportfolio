<<<<<<< HEAD
import { ReactNode, useState, useEffect } from "react";
=======
import { useEffect } from "react";
>>>>>>> portfolio-v2
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
<<<<<<< HEAD
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: user?.role === "admin",
            isLoading: false,
          });
        } else {
          setAuthState({ isAuthenticated: false, isLoading: false });
        }
      } catch (error: any) {
        console.error("Authentication check failed:", error.message);
        setAuthState({ isAuthenticated: false, isLoading: false });
      }
    };
=======
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);
>>>>>>> portfolio-v2

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (authUser?.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
