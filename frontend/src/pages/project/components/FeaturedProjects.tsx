import { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import ProjectModal from "./ProjectModal";
import ProjectGridCard from "./ProjectGridCard";
import ProjectShowcaseCard from "./ProjectShowcaseCard";
import { useProjectStore } from "../../../store/useProjectStore";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const controls = useAnimation();

  const { projects } = useProjectStore();

  // Projects are now pre-fetched at Home level

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Handle switching between grid and carousel views
  const handleViewToggle = () => {
    setIsGridView(!isGridView);
    setSelectedProject(null);
  };

  // Find the selected project for the modal
  const selectedProjectData = projects.find((p) => p._id === selectedProject) || null;

  // Grid animation variants
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0B] py-16 px-4 md:px-8">
      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="projectGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="50"
              height="50"
              fill="none"
              stroke="rgba(0,150,255,0.2)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#projectGrid)" />
        </svg>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1 } },
        }}
      >
        {/* Header with animated title */}
        <div className="mb-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              🚀 My Work
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-white">Work That </span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Matters
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest work and the creative solutions I've built
          </motion.p>

          {/* View toggle buttons */}

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              className={`px-4 py-2 rounded-full text-sm border ${isGridView
                ? "bg-blue-900/50 border-blue-400 text-blue-200"
                : "bg-transparent border-blue-500/30 text-blue-400"
                } transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isGridView || handleViewToggle()}
            >
              <div className="flex items-center">
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid
              </div>
            </motion.button>

            <motion.button
              className={`px-4 py-2 rounded-full text-sm border ${!isGridView
                ? "bg-blue-900/50 border-blue-400 text-blue-200"
                : "bg-transparent border-blue-500/30 text-blue-400"
                } transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !isGridView || handleViewToggle()}
            >
              <div className="flex items-center">
                <List className="h-4 w-4 mr-2" />
                Showcase
              </div>
            </motion.button>
          </div>
        </div>

        {/* Grid View */}
        {isGridView && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <ProjectGridCard
                key={project._id}
                project={project}
                variants={gridItemVariants}
              />
            ))}
          </motion.div>
        )}

        {/* Showcase View */}
        {!isGridView && (
          <div className="relative mt-16">
            <div className="flex flex-col items-center">
              {projects.map((project) => (
                <ProjectShowcaseCard
                  key={project._id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProjectData}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
