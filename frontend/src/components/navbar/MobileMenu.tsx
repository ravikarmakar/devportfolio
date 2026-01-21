import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

interface NavItem {
    name: string;
    icon: JSX.Element;
    link: string;
}

interface MobileMenuProps {
    darkMode: boolean;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    navItems: NavItem[];
    isActive: (path: string) => boolean;
}

const MobileMenu = memo(
    ({ darkMode, isOpen, setIsOpen, navItems, isActive }: MobileMenuProps) => {
        return (
            <>
                {/* Mobile menu button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center md:hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
                                style={{ top: '72px' }}
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Menu Content */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`md:hidden fixed top-[72px] left-0 right-0 mx-4 rounded-lg shadow-xl z-10 ${darkMode
                                    ? "bg-gray-900/95 backdrop-blur-md border border-gray-800"
                                    : "bg-white/95 backdrop-blur-md border border-gray-200"
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
                                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.link)
                                                    ? darkMode
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-blue-500/10 text-blue-600"
                                                    : darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                    }
                    ${darkMode
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
                        </>
                    )}
                </AnimatePresence>
            </>
        );
    }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
