import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SkillCard } from "./SkillCard";
import * as LucideIcons from "lucide-react";
import { iconMap } from "./SkillCard";

export const CategorySection = ({ category, index }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const IconComponent = iconMap[category.iconName] || LucideIcons.Circle;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-accent text-white relative overflow-hidden">
          <IconComponent className="w-6 h-6" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <h3 className="text-xl font-bold dark:text-white text-gray-800">
          {category.title}
        </h3>
      </div>

      <div className="grid gap-4">
        {category.skills.map((skill: any, idx: number) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};
