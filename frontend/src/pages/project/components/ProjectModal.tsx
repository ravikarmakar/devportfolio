import { useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
} from "framer-motion";

interface Project {
    _id: string;
    title: string;
    description: string;
    details?: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    liveLink?: string;
    sourceLink?: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({
    project,
    isOpen,
    onClose,
}: ProjectModalProps) {
    const containerRef = useRef(null);

    // For the 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Transform values for 3D rotation
    const rotateX = useTransform(y, [-20, 20], [10, -10]);
    const rotateY = useTransform(x, [-20, 20], [-10, 10]);

    return (
        <AnimatePresence>
            {isOpen && project !== null && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
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
                        >
                            <div className="relative">
                                {/* Header image */}
                                <div className="relative h-64 md:h-96 overflow-hidden">
                                    <img
                                        src={project?.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />

                                    {/* Close button */}
                                    <motion.button
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white border border-white/20"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                    >
                                        <X className="h-6 w-6" />
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
                                            {project?.details}
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
                                            href={project?.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium flex items-center"
                                        >
                                            Visit Live Project
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </a>

                                        <a
                                            href={project?.sourceLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium flex items-center"
                                        >
                                            View Source Code
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
