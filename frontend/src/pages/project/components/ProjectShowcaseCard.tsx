import { ExternalLink, ChevronRight, Github } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    liveLink?: string;
    sourceLink?: string;
}

interface ProjectShowcaseCardProps {
    project: Project;
    onViewDetails: (projectId: string) => void;
}

export default function ProjectShowcaseCard({ project, onViewDetails }: ProjectShowcaseCardProps) {
    return (
        <motion.div
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
                        src={project?.imageUrl}
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
                            onClick={() => onViewDetails(project._id)}
                        >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </motion.button>

                        <a
                            href={project?.liveLink}
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
    );
}
