import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

interface ProtectedAdminRouteProps {
  children?: ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
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

    checkAuth();
  }, []);

  if (authState.isLoading) {
    return <LoadingScreen key="loading" />;
  }

  return authState.isAuthenticated ? (
    children ?? null
  ) : (
    <Navigate to="/login" replace />
  );
};
