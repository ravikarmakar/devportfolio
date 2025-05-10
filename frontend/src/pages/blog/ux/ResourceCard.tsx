import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Book, Video, PenTool, Newspaper } from "lucide-react";
import { ResourceItem } from "../type/blog";

interface ResourceCardProps {
  resource: ResourceItem;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case "video":
        return Video;
      case "article":
        return Newspaper;
      case "course":
        return Book;
      case "tool":
        return PenTool;
      default:
        return Book;
    }
  };

  const Icon = getIcon();

  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="block bg-white dark:bg-secondary/20 rounded-xl p-6 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2 dark:text-white group-hover:text-accent transition-colors">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {resource.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-accent">{resource.category}</span>
            <ExternalLink
              size={16}
              className="text-gray-400 group-hover:text-accent transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ResourceCard;
