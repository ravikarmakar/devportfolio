import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Code,
  Layers,
  Send,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// Import optimized sub-components
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import ThemeToggle from "./navbar/ThemeToggle";
import ProfileDropdown from "./navbar/ProfileDropdown";
import MobileMenu from "./navbar/MobileMenu";
import GlowingParticles from "./navbar/GlowingParticles";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Throttle utility function for scroll optimization
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T & { cancel?: () => void } => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  const throttledFunc = function (this: any, ...args: Parameters<T>) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    const execute = () => {
      lastExecTime = currentTime;
      func.apply(this, args);
    };

    if (timeSinceLastExec >= delay) {
      execute();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(execute, delay - timeSinceLastExec);
    }
  } as T & { cancel?: () => void };

  throttledFunc.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttledFunc;
};

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Memoize nav items to prevent recreation on every render
  const navItems = useMemo(
    () => [
      { name: "Home", icon: <Home size={18} />, link: "/" },
      { name: "Projects", icon: <Code size={18} />, link: "/projects" },
      { name: "Blog", icon: <Layers size={18} />, link: "/blog" },
      { name: "Components", icon: <Layers size={18} />, link: "/components" },
      { name: "Contact", icon: <Send size={18} />, link: "/contact" },
    ],
    []
  );

  // Throttled scroll handler with passive listener
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 20);
    }, 100); // Fire max once per 100ms

    // Passive listener = better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      handleScroll.cancel?.();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);



  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled
        ? "bg-black/50 backdrop-blur-md border-b border-blue-500/20"
        : "bg-transparent"
        } ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo Component */}
        <Logo darkMode={darkMode} onClick={() => navigate("/")} />

        {/* Desktop Navigation Component */}
        <NavLinks
          darkMode={darkMode}
          navItems={navItems}
          isActive={isActive}
        />

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Component */}
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Profile Dropdown Component */}
          <ProfileDropdown
            darkMode={darkMode}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />

          {/* Mobile Menu Component */}
          <MobileMenu
            darkMode={darkMode}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navItems={navItems}
            isActive={isActive}
          />
        </div>
      </div>

      {/* Glowing Particles Component */}
      <GlowingParticles scrolled={scrolled} />
    </motion.nav>
  );
};

export default Navbar;
