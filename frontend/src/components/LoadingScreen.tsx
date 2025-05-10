import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress]);

  // Color palette - blues
  const colors = {
    primary: "#2563eb", // Medium blue
    secondary: "#1d4ed8", // Darker blue
    accent: "#60a5fa", // Lighter blue
    highlight: "#93c5fd", // Very light blue
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Main container */}
      <div className="relative flex flex-col items-center">
        {/* Orbital animation */}
        <motion.div className="relative w-40 h-40 mb-8">
          {/* Outer orbit */}
          <motion.div
            animate={{
              rotate: 360,
              boxShadow: [
                `0 0 10px ${colors.primary}`,
                `0 0 20px ${colors.primary}`,
                `0 0 10px ${colors.primary}`,
              ],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            style={{ borderColor: colors.primary }}
          />

          {/* Middle orbit */}
          <motion.div
            animate={{
              rotate: -360,
              boxShadow: [
                `0 0 8px ${colors.accent}`,
                `0 0 16px ${colors.accent}`,
                `0 0 8px ${colors.accent}`,
              ],
            }}
            transition={{
              rotate: { duration: 5, repeat: Infinity, ease: "linear" },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            className="absolute inset-4 rounded-full border-2"
            style={{ borderColor: colors.accent }}
          />

          {/* Inner orbit with icon */}
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                `0 0 15px ${colors.secondary}`,
                `0 0 25px ${colors.secondary}`,
                `0 0 15px ${colors.secondary}`,
              ],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-12 rounded-full bg-blue-600 flex items-center justify-center"
            style={{ backgroundColor: colors.secondary }}
          >
            <Code2 className="w-8 h-8 text-white" />
          </motion.div>

          {/* Orbital particles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-blue-300"
              style={{ top: "50%", left: 0, backgroundColor: colors.highlight }}
            />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4"
          >
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-blue-400"
              style={{
                top: "20%",
                right: "20%",
                backgroundColor: colors.accent,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading text and progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-semibold mb-2 text-white">
            Loading Portfolio
          </h2>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          </div>

          <p className="text-sm text-blue-200">{progress}%</p>
        </motion.div>

        {/* Pulsing dots */}
        <motion.div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.highlight }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
