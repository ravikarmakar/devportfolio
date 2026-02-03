// External Imports
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Components (eagerly loaded - small/critical components)
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedAdminRoute from "./pages/auth/ProtectAdmin";
import MainLayout from "./components/MainLayout";

// Store
import { useAuthStore } from "./store/useAuthStore";

// Lazy-Loaded Route Bundles
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const BlogRoutes = lazy(() => import("./routes/BlogRoutes"));

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/home/Home"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const ContactSection = lazy(
  () => import("./pages/home/components/ContactSection")
);
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const AllProjects = lazy(() => import("./pages/project/page/AllProjects"));
const ProjectDetails = lazy(() => import("./pages/project/page/ProjectDetails"));

// Layout wrapper component for public routes
const PublicLayout = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (value: boolean) => void }) => (
  <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
    <Outlet />
  </MainLayout>
);

function App() {
  // Prefetch user data at app level (moved from Hero)
  const { fetchUserData } = useAuthStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUserData();
      hasFetched.current = true;
    }
  }, [fetchUserData]);

  // State Management
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // Manage Theme
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${darkMode ? "dark bg-bgDark" : "bg-gray-50"}`}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedAdminRoute>
                    <AdminRoutes />
                  </ProtectedAdminRoute>
                }
              />

              {/* Blog Routes */}
              <Route
                path="/blog/*"
                element={
                  <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                    <BlogRoutes />
                  </MainLayout>
                }
              />

              {/* Public Routes with MainLayout */}
              <Route element={<PublicLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/components" element={<ComingSoon />} />
                <Route path="/contact" element={<ContactSection />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Toaster />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
