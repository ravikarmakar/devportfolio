import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import useUserStore from "../store/useUserStore";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useUserStore();

  const navLinks = [
    { path: "/", label: "Home" },
    // { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full backdrop-blur-sm z-50 px-6 py-4 transition-colors duration-200 ${
        darkMode ? "bg-bgDark/90" : "bg-white/90 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-accent font-poppins"
        >
          <Link to="/">DevPortfolio</Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link capitalize ${
                location.pathname === link.path ? "active" : ""
              } ${darkMode ? "text-textLight" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun size={20} className="text-textLight" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <img
                  src={user?.profileImageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-accent object-cover"
                />
                {/* <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-bgDark"></div> */}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${
            darkMode ? "text-textLight" : "text-gray-700"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden absolute top-full left-0 right-0 py-4 shadow-lg ${
            darkMode ? "bg-bgDark/95" : "bg-white/95"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-6 py-2 capitalize ${
                location.pathname === link.path
                  ? "text-accent"
                  : darkMode
                  ? "text-textLight"
                  : "text-gray-700"
              } hover:text-accent transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-2 flex items-center justify-between">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center"
            >
              <span
                className={`flex items-center ${
                  darkMode ? "text-textLight" : "text-gray-700"
                }`}
              >
                {darkMode ? (
                  <Sun size={20} className="mr-2" />
                ) : (
                  <Moon size={20} className="mr-2" />
                )}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              <img
                src={user?.profileImageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-accent"
              />
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
