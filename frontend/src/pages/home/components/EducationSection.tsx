import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";

import { education } from "../../../lib/Context";

interface EducationItem {
  id: number;
  years: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  gpa?: string;
  color: string;
}

// Animation variants - defined outside component for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Memoized Timeline Item Component
const TimelineItem = memo(({
  item,
  index,
  isHovered,
  onHover,
  onLeave,
  isMobile,
}: {
  item: EducationItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      className={`relative mb-16 last:mb-0 ${isMobile ? "pl-12" : "grid grid-cols-2 gap-8 items-center"
        }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Dot */}
      <motion.div
        className={`absolute ${isMobile ? "left-4" : "left-1/2"
          } transform ${isMobile ? "" : "-translate-x-1/2"
          } w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-md shadow-blue-900/30 z-10`}
        initial={{ scale: 0 }}
        animate={{ scale: itemInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.2 }}
      >
        {/* Pulsing Ring Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-700"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Content - Left/Right based on index */}
      {!isMobile && !isEven && <div />}

      <motion.div
        className={isMobile ? "w-full" : ""}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`relative group backdrop-blur-md bg-gray-800/50 p-6 rounded-2xl border transition-all duration-300 ${isHovered
            ? "border-blue-700/40 shadow-lg shadow-blue-950/20"
            : "border-white/10 shadow-md"
            }`}
          animate={{
            borderColor: isHovered
              ? "rgba(29, 78, 216, 0.4)"
              : "rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />

          {/* Year Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <GraduationCap size={16} />
            <span>{item.years}</span>
          </div>

          {/* Degree Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
            {item.degree}
          </h3>

          {/* Institution Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Award size={16} className="text-blue-400" />
              <span className="font-medium">{item.institution}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={14} className="text-purple-400" />
              <span>{item.location}</span>
            </div>
          </div>

          {/* GPA Badge */}
          {item.gpa && (
            <div className="inline-block px-3 py-1 bg-gray-700/50 backdrop-blur-sm rounded-full text-xs font-medium text-gray-300 border border-gray-600/50 mb-4">
              GPA: {item.gpa}
            </div>
          )}

          {/* Description - Expandable */}
          <AnimatePresence>
            {(isHovered || isMobile) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-4" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {!isMobile && isEven && <div />}
    </motion.div>
  );
});

TimelineItem.displayName = "TimelineItem";

// Main Component
export default function EducationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Memoized callbacks
  const handleHover = useCallback((id: number) => {
    setHoveredItem(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // Optimized resize handler with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Education
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Academic </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            My academic background that has shaped my technical expertise and
            professional approach
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            className={`absolute ${isMobile ? "left-4" : "left-1/2"
              } top-0 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-400`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Timeline Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {education.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isHovered={hoveredItem === item.id}
                onHover={() => handleHover(item.id)}
                onLeave={handleLeave}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
