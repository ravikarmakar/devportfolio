import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const SkillCard = ({ skill, index }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl dark:bg-white/[0.08] bg-white/[0.9] backdrop-blur-lg border border-white/10 p-4 hover:border-accent/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 dark:bg-accent/20">
                {skill.icon}
              </div>
              <h4 className="font-medium text-base dark:text-white text-gray-800">
                {skill.name}
              </h4>
            </div>
            <span className="text-sm font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              {skill.level}%
            </span>
          </div>

          <div className="relative h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="absolute h-full bg-accent rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
