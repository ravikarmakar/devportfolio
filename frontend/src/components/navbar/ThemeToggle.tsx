import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { memo } from "react";

interface ThemeToggleProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeToggle = memo(({ darkMode, toggleDarkMode }: ThemeToggleProps) => {
    return (
        <motion.button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-10 h-10 rounded-full 
        ${darkMode
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
    );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
