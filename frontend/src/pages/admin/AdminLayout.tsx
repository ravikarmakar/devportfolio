import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Wrench,
  Mail,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    {
      path: "/admin/projects",
      icon: <Briefcase size={20} />,
      label: "Projects",
    },
    { path: "/admin/skills", icon: <Wrench size={20} />, label: "Skills" },
    { path: "/admin/profile", icon: <User size={20} />, label: "Profile" },
    { path: "/admin/blog", icon: <FileText size={20} />, label: "Blog" },
    { path: "/admin/messages", icon: <Mail size={20} />, label: "Messages" },

    {
      path: "/admin/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bgDark flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-secondary/20 shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-secondary/20 backdrop-blur-sm 
          border-r border-gray-200 dark:border-secondary/30 transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="h-full px-3 py-4 flex flex-col">
          <Link
            to="/admin"
            className="mb-8 px-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <h1 className="text-2xl font-bold text-accent">Admin Panel</h1>
          </Link>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-accent text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-secondary/40"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-secondary/30">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="ml-3">Exit Admin</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
