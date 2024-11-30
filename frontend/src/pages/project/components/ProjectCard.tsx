import React from "react";
import { motion } from "framer-motion";
import { GithubIcon, ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Project } from "../../../types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  function formatTags(tags: string[]): string[] {
    return tags;
  }

  return (
    <motion.div
      ref={ref}
      className="card group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.imgUrl}
          alt={project.title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bgDark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent"
            >
              <GithubIcon size={24} />
            </a>
            <a
              href={project.links.hosted}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-textLight/70 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {formatTags(project.tags).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
