// External Imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";

// Page Imports
import Home from "./pages/home/Home";
import SkillPage from "./pages/skills/SkillPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProjectPage from "./pages/project/ProjectPage";
import ExperiencePage from "./pages/experience/ExperiencePage";
import Contact from "./components/Contact";

// Admin Page Imports
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import SkillsTab from "./pages/admin/components/SkillsTab";
import ProjectsTab from "./pages/admin/components/ProjectsTab";
import BlogsTab from "./pages/admin/components/BlogsTab";
import MessagesTab from "./pages/admin/components/MessagesTab";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`min-h-screen ${
        darkMode ? "text-textLight" : "text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
      <Footer />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen ${
            darkMode ? "dark bg-bgDark" : "bg-gray-50"
          }`}
        >
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsTab />} />
              <Route path="skills" element={<SkillsTab />} />
              <Route path="blog" element={<BlogsTab />} />
              <Route path="messages" element={<MessagesTab />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/skills"
              element={
                <MainLayout>
                  <SkillPage />
                </MainLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <MainLayout>
                  <ProjectPage />
                </MainLayout>
              }
            />
            <Route
              path="/experience"
              element={
                <MainLayout>
                  <ExperiencePage />
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
