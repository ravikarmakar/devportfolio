import { Link } from "react-router-dom";
import { ArrowRight, Link2, Github } from "lucide-react";
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

interface ProjectGridCardProps {
    project: Project;
    variants: {
        hidden: { opacity: number; y: number };
        visible: {
            opacity: number;
            y: number;
            transition: { duration: number };
        };
    };
}

export default function ProjectGridCard({ project, variants }: ProjectGridCardProps) {
    return (
        <motion.div
            className="relative group"
            variants={variants}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
            }}
        >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm border border-blue-500/20 h-full">
                {/* Project image */}
                <div className="overflow-hidden relative h-48">
                    <motion.img
                        src={project?.imageUrl}
                        alt={project?.title}
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
                        {/* Details button using link */}
                        <Link to={`/projects/${project._id}`}>
                            <motion.button
                                className="text-sm text-gray-200 hover:text-blue-300 flex items-center"
                                whileHover={{ x: 5 }}
                            >
                                Explore Details
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </motion.button>
                        </Link>

                        <div className="flex gap-2">
                            <a
                                href={project?.liveLink}
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
    );
}
