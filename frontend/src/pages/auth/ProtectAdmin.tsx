import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (authUser?.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
