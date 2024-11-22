import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = ["skills", "projects", "experience", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full backdrop-blur-sm z-50 px-6 py-4 transition-colors duration-200 ${
        darkMode ? "bg-bgDark/90" : "bg-white/90 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-accent font-poppins"
        >
          DevPortfolio
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`nav-link capitalize ${
                activeSection === section ? "active" : ""
              } ${darkMode ? "text-textLight" : "text-gray-700"}`}
            >
              {section}
            </a>
          ))}
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
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`block px-6 py-2 capitalize ${
                activeSection === section
                  ? "text-accent"
                  : darkMode
                  ? "text-textLight"
                  : "text-gray-700"
              } hover:text-accent transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              {section}
            </a>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="block w-full text-left px-6 py-2"
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
        </motion.div>
      )}
      {/* Avatar Icon - Added */}
    </motion.nav>
  );
};

export default Navbar;
