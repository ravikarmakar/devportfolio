import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";

interface NavItem {
    name: string;
    icon: JSX.Element;
    link: string;
}

interface NavLinksProps {
    darkMode: boolean;
    navItems: NavItem[];
    isActive: (path: string) => boolean;
}

const NavLinks = memo(({ darkMode, navItems, isActive }: NavLinksProps) => {
    return (
        <div className="hidden md:flex">
            <ul className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                    <motion.li
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <Link
                            to={item.link}
                            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive(item.link)
                                ? darkMode
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-blue-500/10 text-blue-600"
                                : darkMode
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                } 
              ${darkMode
                                    ? "hover:bg-blue-500/10 hover:text-blue-400"
                                    : "hover:bg-blue-500/10 hover:text-blue-600"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
});

NavLinks.displayName = "NavLinks";

export default NavLinks;
