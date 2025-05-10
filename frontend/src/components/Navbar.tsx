import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  Code,
  Layers,
  Send,
  Home,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would apply dark mode to the document here
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", icon: <Home size={18} />, link: "/" },
    { name: "Projects", icon: <Code size={18} />, link: "/projects" },
    { name: "Blog", icon: <Layers size={18} />, link: "/blog" },
    { name: "Components", icon: <Layers size={18} />, link: "/components" },
    { name: "Contact", icon: <Send size={18} />, link: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black/50 backdrop-blur-md border-b border-blue-500/20"
          : "bg-transparent"
      } ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm"></div>
            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
              ${
                darkMode
                  ? "bg-gray-900 border border-blue-500"
                  : "bg-white border border-blue-400"
              }`}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="text-blue-500 font-bold text-xl"
              >
                R
              </motion.span>
            </div>
          </div>
          <motion.h1
            className="ml-3 text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Devfolio
            </span>
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <ul className="flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.button
                  onClick={() => navigate(item.link)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium ${
                    isActive(item.link)
                      ? darkMode
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-500/10 text-blue-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } 
                  ${
                    darkMode
                      ? "hover:bg-blue-500/10 hover:text-blue-400"
                      : "hover:bg-blue-500/10 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.name}
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={darkMode ? "dark" : "light"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-blue-600" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Profile Button */}
          <div className="relative">
            <motion.button
              onClick={toggleProfile}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <User
                size={18}
                className={darkMode ? "text-blue-400" : "text-blue-600"}
              />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-1 
                    ${
                      darkMode
                        ? "bg-gray-900 border border-blue-900/50"
                        : "bg-white border border-gray-200"
                    }`}
                >
                  {/* Profile Menu Items */}
                  <div className="px-4 py-3">
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Ravi Developer
                    </p>
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ravikarmkar94475@gmail.com
                    </p>
                  </div>
                  <div
                    className={`border-t ${
                      darkMode ? "border-gray-800" : "border-gray-200"
                    }`}
                  ></div>
                  {["Profile"].map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      className={`block px-4 py-2 text-sm rounded-md ${
                        darkMode
                          ? "hover:bg-gray-800 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                  <div
                    className={`border-t ${
                      darkMode ? "border-gray-800" : "border-gray-200"
                    }`}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="flex items-center justify-center md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden mt-4 rounded-lg ${
              darkMode
                ? "bg-gray-900/80 backdrop-blur-md"
                : "bg-white/80 backdrop-blur-md"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.link}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive(item.link)
                        ? darkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-500/10 text-blue-600"
                        : darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }
                    ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
                        : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glowing particles under navbar */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-px">
        <div className="relative w-full h-full">
          {scrolled && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-blue-400"
                  initial={{
                    left: `${Math.random() * 100}%`,
                    opacity: 0,
                  }}
                  animate={{
                    left: `${Math.random() * 100}%`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    repeatType: "loop",
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
