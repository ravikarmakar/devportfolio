import React from "react";
import * as LucideIcons from "lucide-react";

interface SkillCardSkeletonProps {
  className?: string;
  iconName?: keyof typeof LucideIcons;
  showIcon?: boolean;
  showLevel?: boolean;
  showProgressBar?: boolean;
  variant?: "default" | "compact";
}

export const SkillCardSkeleton: React.FC<SkillCardSkeletonProps> = ({
  className = "",
  iconName,
  showIcon = true,
  showLevel = true,
  showProgressBar = true,
  variant = "default",
}) => {
  // Select an icon if provided, otherwise use a fallback
  const IconComponent =
    iconName && LucideIcons[iconName]
      ? LucideIcons[iconName]
      : LucideIcons.Circle;

  return (
    <div
      className={`
        relative group animate-pulse 
        ${variant === "compact" ? "py-2" : "p-4"}
        rounded-2xl dark:bg-white/[0.08] bg-white/[0.9] 
        backdrop-blur-lg border border-white/10
        ${className}
      `}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {showIcon && (
              <div className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700">
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            )}

            {/* Skill Name Skeleton */}
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>

            {showLevel && (
              <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full ml-auto"></div>
            )}
          </div>

          {showProgressBar && (
            <div className="relative h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden mt-2">
              <div className="absolute h-full w-2/3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
