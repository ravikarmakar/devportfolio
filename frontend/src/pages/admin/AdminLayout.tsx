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
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    {
      path: "/admin/projects",
      icon: <Briefcase size={20} />,
      label: "Projects",
    },
    { path: "/admin/skills", icon: <Wrench size={20} />, label: "Skills" },
    {
      path: "/admin/experience",
      icon: <Wrench size={20} />,
      label: "Experience",
    },
    { path: "/admin/blog", icon: <FileText size={20} />, label: "Blog" },
    { path: "/admin/messages", icon: <Mail size={20} />, label: "Messages" },
    {
      path: "/admin/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bgDark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-secondary/20 backdrop-blur-sm border-r border-gray-200 dark:border-secondary/30">
        <div className="h-full px-3 py-4 flex flex-col">
          <Link to="/admin" className="mb-8 px-3">
            <h1 className="text-2xl font-bold text-accent">Admin Panel</h1>
          </Link>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
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
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="ml-3">Exit Admin</span>
            </Link>
          </div>
        </div>
      </aside>

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
