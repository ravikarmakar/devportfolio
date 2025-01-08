// // ProjectCardLoadingSkeleton.js

// import { motion } from "framer-motion";

// const ProjectCardLoadingSkeleton = ({ count }: { count: number }) => {
//   const skeletons = Array.from({ length: count });

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {skeletons.map((_, index) => (
//         <motion.div
//           key={index}
//           className="card animate-pulse"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//         >
//           <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-300 dark:bg-gray-700 w-full h-48"></div>
//           <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
//           <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
//           <div className="flex flex-wrap gap-2">
//             {[...Array(3)].map((_, tagIndex) => (
//               <div
//                 key={tagIndex}
//                 className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full text-sm w-16 h-6"
//               ></div>
//             ))}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ProjectCardLoadingSkeleton;

import { motion } from "framer-motion";

const ProjectCardLoadingSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Placeholder */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-800 dark:bg-gray-700 animate-pulse h-48 w-full"></div>

      {/* Title Skeleton */}
      <div className="h-6 w-3/4 bg-gray-800 dark:bg-gray-700 rounded-md mb-2 animate-pulse"></div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-800 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-800 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      {/* Tags Skeleton */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((tag) => (
          <div
            key={tag}
            className="h-6 w-20 bg-gray-800 dark:bg-gray-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCardLoadingSkeleton;
