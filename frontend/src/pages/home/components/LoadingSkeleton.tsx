import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side Content Skeleton */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 w-full"
        >
          {/* Name Skeleton */}
          <div className="h-12 md:h-16 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

          {/* Role Skeleton */}
          <div className="h-8 md:h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

          {/* Bio Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Content Skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[500px] items-center justify-center overflow-hidden hidden md:flex"
        >
          {/* Large Geometric Shape Skeleton */}
          <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </motion.div>

        {/* Mobile View - Single Column */}
        <div className="md:hidden w-full flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-6"></div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
