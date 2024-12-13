// External Imports
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";
import { ProtectedAdminRoute } from "./pages/auth/ProtectAdmin";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/home/Home"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const Contact = lazy(() => import("./components/Contact"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SkillsTab = lazy(() => import("./pages/admin/components/SkillsTab"));
const ProjectsTab = lazy(() => import("./pages/admin/components/ProjectsTab"));
const BlogsTab = lazy(() => import("./pages/admin/components/BlogsTab"));
const MessagesTab = lazy(() => import("./pages/admin/components/MessagesTab"));
const ProfileTab = lazy(() => import("./pages/admin/components/ProfileTab"));
const BlogLayout = lazy(() => import("./pages/blog/BlogLayout"));
const Resources = lazy(() => import("./pages/blog/pages/Resources"));
const BlogPost = lazy(() => import("./pages/blog/pages/BlogPost"));
const BlogList = lazy(() => import("./pages/blog/pages/BlogList"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));

function App() {
  // State Management
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Effect Hooks
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Layout Component
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
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Admin Routes */}
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<ProjectsTab />} />
                  <Route path="skills" element={<SkillsTab />} />
                  <Route path="blog" element={<BlogsTab />} />
                  <Route path="messages" element={<MessagesTab />} />
                  <Route path="profile" element={<ProfileTab />} />
                </Route>
              </Route>

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogLayout />}>
                <Route index element={<BlogList />} />
                <Route path=":id" element={<BlogPost />} />
                <Route path="resources" element={<Resources />} />
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
                path="/login"
                element={
                  <MainLayout>
                    <LoginPage />
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
          </Suspense>
          <Toaster />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
