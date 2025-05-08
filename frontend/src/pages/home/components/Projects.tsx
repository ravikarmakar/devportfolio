import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  List,
  ArrowRight,
  Link2,
  ExternalLink,
  ChevronRight,
  Github,
} from "lucide-react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { projects } from "../../../lib/Context";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Handle switching between grid and carousel views
  const handleViewToggle = () => {
    setIsGridView(!isGridView);
    setSelectedProject(null);
  };

  // For the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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

  // Handle card tilt effect
  interface MouseMoveEvent extends React.MouseEvent<HTMLDivElement> {
    currentTarget: HTMLDivElement;
  }

  const handleMouseMove = (event: MouseMoveEvent, id: number | null): void => {
    if (containerRef.current && id === selectedProject) {
      const { clientX, clientY } = event;
      const { left, top, width, height } =
        event.currentTarget.getBoundingClientRect();
      const xValue = clientX - left;
      const yValue = clientY - top;

      // Convert to a value between -20 and 20
      const newX = (xValue / width - 0.5) * 20;
      const newY = (yValue / height - 0.5) * -20;

      x.set(newX);
      y.set(newY);
    }
  };

  // Reset the tilt when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Transform values for 3D rotation
  const rotateX = useTransform(y, [-20, 20], [10, -10]);
  const rotateY = useTransform(x, [-20, 20], [-10, 10]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-16 px-4 md:px-8">
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
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-white">Featured</span>
            <span className="bg-clip-text text-blue-500"> Projects</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="h-1 w-40 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 160, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <p className="text-gray-400 text-lg max-w-2xl mt-5 mx-auto">
            Explore my latest work and the creative solutions I've built
          </p>

          {/* View toggle buttons */}

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              className={`px-4 py-2 rounded-full text-sm border ${
                isGridView
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
              className={`px-4 py-2 rounded-full text-sm border ${
                !isGridView
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
              <motion.div
                key={project.id}
                className="relative group"
                variants={gridItemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm border border-blue-500/20 h-full">
                  {/* Project image */}
                  <div className="overflow-hidden relative h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-blue-900/60 backdrop-blur-sm text-xs rounded-full border border-blue-400/30 text-blue-200">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-200 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between items-center mt-4">
                      <motion.button
                        className="text-sm text-gray-200 hover:text-blue-300 flex items-center"
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedProject(project.id)}
                      >
                        Explore Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </motion.button>

                      <div className="flex gap-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-400"
                        >
                          <Github className="h-5 w-5" />
                        </a>

                        <a
                          href={project.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Link2 className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Showcase View */}
        {!isGridView && (
          <div className="relative mt-16">
            <div className="flex flex-col items-center">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="w-full max-w-4xl mb-24 last:mb-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Project Image */}
                    <motion.div
                      className="w-full md:w-1/2 overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 md:h-96 object-cover rounded-xl"
                      />
                    </motion.div>

                    {/* Project Details */}
                    <div className="w-full md:w-1/2 relative">
                      <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />

                      <div className="px-3 py-1 bg-blue-900/60 backdrop-blur-sm text-xs inline-block rounded-full border border-blue-400/30 text-blue-300 mb-4">
                        {project.category}
                      </div>

                      <h3 className="text-3xl font-bold text-blue-200 mb-4">
                        {project.title}
                      </h3>

                      <p className="text-blue-100/80 mb-6">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-blue-300 text-sm mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-900/40 text-blue-300 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4">
                        <motion.button
                          className="px-6 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-full flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedProject(project.id)}
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </motion.button>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 border border-blue-500/50 text-blue-300 rounded-full hover:bg-blue-900/30 transition-colors duration-300 flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Project
                        </a>

                        <a
                          href={project.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-4 border border-blue-500/50 text-blue-300 rounded-full hover:bg-blue-900/30 transition-colors duration-300 flex items-center justify-center w-12 h-12"
                        >
                          <Github className="h-8 w-8" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Modal Content */}
              <motion.div
                className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-blue-900/50 to-black/70 border border-blue-500/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  perspective: 1000,
                }}
                ref={containerRef}
                onMouseMove={(e) => handleMouseMove(e, selectedProject)}
                onMouseLeave={handleMouseLeave}
              >
                {projects
                  .filter((p) => p.id === selectedProject)
                  .map((project) => (
                    <div key={project.id} className="relative">
                      {/* Header image */}
                      <div className="relative h-64 md:h-96 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />

                        {/* Close button */}
                        <motion.button
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white border border-white/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedProject(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </motion.button>

                        {/* Project title overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8">
                          <div className="px-3 py-1 bg-blue-900/60 backdrop-blur-sm text-xs inline-block rounded-full border border-blue-400/30 text-blue-300 mb-2">
                            {project.category}
                          </div>
                          <h2 className="text-4xl font-bold text-white mb-2">
                            {project.title}
                          </h2>
                        </div>
                      </div>

                      {/* Project content */}
                      <div className="p-8">
                        {/* Technologies */}
                        <div className="mb-8">
                          <h3 className="text-blue-300 text-lg mb-3 font-medium">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-blue-900/50 text-blue-200 rounded-full border border-blue-600/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                          <h3 className="text-blue-300 text-lg mb-3 font-medium">
                            Project Overview
                          </h3>
                          <p className="text-blue-100/90 leading-relaxed">
                            {project.details}
                          </p>
                        </div>

                        {/* Key features */}
                        <div className="mb-8">
                          <h3 className="text-blue-300 text-lg mb-3 font-medium">
                            Key Features
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                              <li key={i} className="flex items-start">
                                <div className="mt-1 mr-3 p-1 bg-blue-500/20 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-blue-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <span className="text-blue-100/80">
                                  {i === 0
                                    ? "Advanced data processing algorithms"
                                    : i === 1
                                    ? "Intuitive user interface design"
                                    : i === 2
                                    ? "Real-time synchronization"
                                    : "Seamless integration capabilities"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Project stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                          {[
                            { label: "Development Time", value: "3 months" },
                            { label: "Team Size", value: "4 developers" },
                            { label: "Code Lines", value: "15,000+" },
                            { label: "Client Satisfaction", value: "98%" },
                          ].map((stat, i) => (
                            <div
                              key={i}
                              className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4"
                            >
                              <p className="text-blue-300 text-sm">
                                {stat.label}
                              </p>
                              <p className="text-xl font-bold text-white">
                                {stat.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Action button */}
                        <div className="flex justify-center mt-8 gap-5">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium flex items-center"
                          >
                            Visit Live Project
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>

                          <a
                            href={project.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium flex items-center"
                          >
                            View Source Code
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
