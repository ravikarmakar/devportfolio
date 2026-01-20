import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Code, Layers, Star, Grid3X3, Loader2 } from "lucide-react";

import ProjectGridCard from "../components/ProjectGridCard";
import { useProjectStore } from "../../../store/useProjectStore";

// Category filters for projects
const projectCategories = [
    { name: "All", icon: <Grid3X3 size={18} /> },
    { name: "Web App", icon: <Code size={18} /> },
    { name: "Mobile App", icon: <Layers size={18} /> },
    { name: "Featured", icon: <Star size={18} /> },
];

const AllProjects = () => {
    const { projects, isLoading, fetchAllProjects } = useProjectStore();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [displayProjects, setDisplayProjects] = useState(projects);

    // Fetch all projects on mount
    useEffect(() => {
        fetchAllProjects();
    }, [fetchAllProjects]);

    // Filter projects based on selected category and search query
    useEffect(() => {
        let filtered = [...projects]; // Create a copy to avoid mutation issues

        if (selectedCategory === "Featured") {
            filtered = filtered.filter((project) => project.isFeatured);
        } else if (selectedCategory !== "All") {
            filtered = filtered.filter((project) => {
                const projectCategory = project.category?.toLowerCase().trim() || "";
                const selected = selectedCategory.toLowerCase().trim();
                return projectCategory === selected || projectCategory.includes(selected);
            });
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.technologies.some((tech) =>
                        tech.toLowerCase().includes(query)
                    )
            );
        }

        setDisplayProjects(filtered);
    }, [selectedCategory, searchQuery, projects]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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

    const glowVariants = {
        initial: { opacity: 0.3 },
        animate: {
            opacity: [0.3, 0.5, 0.3],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-8 px-4 md:px-8">
                {/* Animated background elements */}
                <motion.div
                    className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-600/30 blur-3xl"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 1 }}
                />

                {/* Background Pattern */}
                <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern
                            id="projectsGrid"
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
                        <rect width="100%" height="100%" fill="url(#projectsGrid)" />
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                            Innovative Creations
                        </h1>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            Explore my portfolio of web applications, mobile apps, and
                            creative solutions. Each project represents a unique challenge
                            solved with modern technologies.
                        </p>
                    </motion.div>


                </div>
            </section>

            {/* Projects Section */}
            <section className="pt-6 pb-16 px-4 md:px-8 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Category Filters and Search */}
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide space-x-2 w-full md:w-auto">
                            {projectCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap text-sm transition-all ${selectedCategory === category.name
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        }`}
                                >
                                    <span className="mr-2">{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                            <p className="text-gray-400">Loading projects...</p>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!isLoading && (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {displayProjects.length > 0 ? (
                                displayProjects.map((project) => (
                                    <ProjectGridCard
                                        key={project._id}
                                        project={project}
                                        variants={gridItemVariants}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-16">
                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-gray-600" />
                                    </div>
                                    <p className="text-gray-400 text-lg mb-4">
                                        No projects found matching your search.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("All");
                                        }}
                                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllProjects;