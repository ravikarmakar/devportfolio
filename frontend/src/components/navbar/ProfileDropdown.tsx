import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface DropdownItem {
    id: number;
    name: string;
    link: string;
}

interface ProfileDropdownProps {
    darkMode: boolean;
    profileOpen: boolean;
    setProfileOpen: (value: boolean) => void;
}

const MotionLink = motion.create(Link);

const ProfileDropdown = memo(
    ({ darkMode, profileOpen, setProfileOpen }: ProfileDropdownProps) => {
        const dropdownRef = useRef<HTMLDivElement>(null);

        // Memoized dropdown items
        const dropdownItems: DropdownItem[] = [
            { id: 1, name: "Profile", link: "/profile" },
        ];

        // Click-outside handler to close dropdown
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    profileOpen &&
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node)
                ) {
                    setProfileOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [profileOpen, setProfileOpen]);

        return (
            <div className="relative" ref={dropdownRef}>
                <motion.button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full 
            ${darkMode
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
                ${darkMode
                                    ? "bg-gray-900 border border-blue-900/50"
                                    : "bg-white border border-gray-200"
                                }`}
                        >
                            {/* Profile Menu Items */}
                            <div className="px-4 py-3">
                                <p
                                    className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    Ravi Karmakar
                                </p>
                                <p
                                    className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    ravikarmkar94475@gmail.com
                                </p>
                            </div>
                            <div
                                className={`border-t ${darkMode ? "border-gray-800" : "border-gray-200"
                                    }`}
                            ></div>
                            {dropdownItems.map((item) => (
                                <MotionLink
                                    key={item.id}
                                    to={item.link}
                                    className={`block px-4 py-2 text-sm rounded-md ${darkMode
                                            ? "hover:bg-gray-800 text-gray-300"
                                            : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    whileHover={{ x: 5 }}
                                    onClick={() => setProfileOpen(false)}
                                >
                                    {item.name}
                                </MotionLink>
                            ))}
                            <div
                                className={`border-t ${darkMode ? "border-gray-800" : "border-gray-200"
                                    }`}
                            ></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
