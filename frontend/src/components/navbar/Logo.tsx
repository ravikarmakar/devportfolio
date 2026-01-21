import { motion } from "framer-motion";
import { memo } from "react";

interface LogoProps {
    darkMode: boolean;
    onClick: () => void;
}

const Logo = memo(({ darkMode, onClick }: LogoProps) => {
    return (
        <motion.div
            className="flex items-center cursor-pointer"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm"></div>
                <div
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
            ${darkMode
                            ? "bg-gray-900 border border-blue-500"
                            : "bg-white border border-blue-400"
                        }`}
                >
                    {/* Optimized rotation - slower duration = less GPU work */}
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 20, // Increased from 6 to reduce GPU usage
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                        className="text-xl font-bold text-blue-500"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Devfolio
                </span>
            </motion.h1>
        </motion.div>
    );
});

Logo.displayName = "Logo";

export default Logo;
