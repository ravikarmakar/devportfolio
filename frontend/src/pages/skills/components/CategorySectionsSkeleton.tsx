import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SkillCardSkeleton } from "./SkillCardSkeleton";
import { iconMap } from "./SkillCard";

interface CategorySectionSkeletonProps {
  category?: {
    iconName?: keyof typeof iconMap;
    title?: string;
    skillCount?: number;
  };
  index?: number;
}

export const CategorySectionSkeleton: React.FC<
  CategorySectionSkeletonProps
> = ({ category = {}, index = 0 }) => {
  const {
    iconName = "circle",
    title = "Loading Category",
    skillCount = 3,
  } = category;

  const IconComponent = iconMap[iconName] || LucideIcons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-6 animate-pulse"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-accent/20 text-white relative overflow-hidden">
          <IconComponent className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="grid gap-4">
        {Array(skillCount)
          .fill(0)
          .map((_, idx) => (
            <SkillCardSkeleton key={idx} className="animate-none" />
          ))}
      </div>
    </motion.div>
  );
};

// Optional: Create a CategorySectionsSkeleton for multiple loading sections
export const CategorySectionsSkeleton: React.FC<{ count?: number }> = ({
  count = 2,
}) => {
  return (
    <div className="space-y-8">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <CategorySectionSkeleton key={index} index={index} />
        ))}
    </div>
  );
};
