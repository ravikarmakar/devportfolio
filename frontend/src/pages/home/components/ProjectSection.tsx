import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../../../lib/Context";

export default function ProjectSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Project categories
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "design", name: "UI/UX Design" },
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div ref={containerRef} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white">Featured</span>
            <span className="bg-clip-text text-blue-500"> Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and the creative solutions I've built
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() =>
                  setExpandedProject(
                    expandedProject === project.id ? null : project.id
                  )
                }
              >
                <motion.div
                  className={`rounded-xl overflow-hidden h-full bg-gray-800 border border-gray-700 ${
                    hoveredProject === project.id ||
                    expandedProject === project.id
                      ? "ring-2 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-4"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-800 bg-opacity-80 rounded-full text-xs font-medium text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-400 mb-4">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <motion.a
                              href={project.link}
                              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              View Project <span className="ml-1">→</span>
                            </motion.a>
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}
                            />
                          </div>
                        </motion.div>
                      )}

                      {expandedProject !== project.id && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {project.description}
                          </p>
                          <div className="absolute bottom-4 right-4">
                            {project.featured && (
                              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full text-xs font-bold text-white">
                                Featured
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Click indicator */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity:
                      hoveredProject === project.id &&
                      expandedProject !== project.id
                        ? 1
                        : 0,
                    y:
                      hoveredProject === project.id &&
                      expandedProject !== project.id
                        ? 0
                        : -10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                    Click to expand
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
