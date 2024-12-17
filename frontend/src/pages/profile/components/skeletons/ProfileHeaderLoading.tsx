import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ProfileHeaderLoading: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content Loading State */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Loading Profile...</span>
          </motion.div>

          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 mb-4 w-3/4 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 mb-4 w-full rounded"></div>

            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mb-6 w-1/2 rounded"></div>

            <div className="space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>

            <div className="flex gap-4 mt-8">
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>

            <div className="flex gap-4 mt-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content - Loading Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[400px] flex items-center justify-center order-first md:order-last"
        >
          <div className="animate-pulse">
            <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileHeaderLoading;
