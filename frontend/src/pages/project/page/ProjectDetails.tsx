import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Github,
    Calendar,
    Tag,
    Loader2,
} from "lucide-react";

import { useProjectStore, Project } from "../../../store/useProjectStore";

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchProjectDetails, isLoading } = useProjectStore();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        // Scroll to top when component mounts or id changes
        window.scrollTo(0, 0);

        const loadProject = async () => {
            if (id) {
                const data = await fetchProjectDetails(id);
                setProject(data);
            }
        };
        loadProject();
    }, [id, fetchProjectDetails]);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                    <p className="text-blue-300 text-lg">Loading project details...</p>
                </motion.div>
            </div>
        );
    }

    // Not found state
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Project Not Found
                    </h2>
                    <p className="text-gray-400 mb-8">
                        The project you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                    >
                        Go Back Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    const formattedDate = new Date(project.createdAt).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern
                        id="detailGrid"
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
                    <rect width="100%" height="100%" fill="url(#detailGrid)" />
                </svg>
            </div>

            {/* Hero Section with Project Image */}
            <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="absolute top-20 left-4 md:left-8 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-black/70 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                </motion.button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Category Badge */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-blue-900/60 backdrop-blur-sm text-sm rounded-full border border-blue-400/30 text-blue-300 flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    {project.category}
                                </span>
                                {project.isFeatured && (
                                    <span className="px-4 py-1.5 bg-yellow-900/60 backdrop-blur-sm text-sm rounded-full border border-yellow-400/30 text-yellow-300">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                {project.title}
                            </h1>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm md:text-base">{formattedDate}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
                {/* Description Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        About This Project
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {project.description}
                    </p>
                </motion.section>

                {/* Technologies Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                                className="px-4 py-2 bg-blue-900/40 text-blue-200 rounded-full border border-blue-600/30 text-sm md:text-base hover:bg-blue-900/60 transition-colors"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.section>

                {/* Project Details Section */}
                {project.details && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Project Details
                        </h2>
                        <div className="bg-gradient-to-br from-blue-900/20 to-black/40 rounded-2xl border border-blue-500/20 p-6 md:p-8">
                            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                {project.details}
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* Action Buttons */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-12"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {project.liveLink && (
                            <motion.a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/25"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink className="h-5 w-5" />
                                Visit Live Project
                                <ArrowRight className="h-5 w-5" />
                            </motion.a>
                        )}

                        {project.sourceLink && (
                            <motion.a
                                href={project.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 border border-gray-700 text-white font-medium rounded-full hover:bg-gray-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github className="h-5 w-5" />
                                View Source Code
                                <ArrowRight className="h-5 w-5" />
                            </motion.a>
                        )}
                    </div>
                </motion.section>

                {/* Navigation */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="pt-8 border-t border-gray-800"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link
                            to="/projects"
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Back to All Projects
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ProjectDetails;
