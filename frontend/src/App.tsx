// External Imports
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Components
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";
import ProtectedAdminRoute from "./pages/auth/ProtectAdmin";
import MainLayout from "./components/MainLayout";

// Lazy-Loaded Admin Pages
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

function App() {
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
            {/* Public Routes */}

            <Route
              path="/"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <LoginPage />
                </MainLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ComingSoon />
                </MainLayout>
              }
            />
            <Route
              path="/components"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ComingSoon />
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ContactSection />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ProfilePage />
                </MainLayout>
              }
            />
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
