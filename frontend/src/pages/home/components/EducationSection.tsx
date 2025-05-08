import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

export default function EducationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen py-12 px-4 md:py-20 md:px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-16 text-center"
        >
          <div className="relative inline-block mb-4">
            <h2 className="text-4xl md:text-5xl font-bold relative z-10">
              <span className="text-white">Education</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                {" "}
                Journey
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            My academic background that has shaped my technical expertise and
            professional approach
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line - hidden on mobile */}
          <motion.div
            className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-400 hidden md:block"
            initial={{ height: 0 }}
            animate={{ height: isInView ? "100%" : 0 }}
            transition={{ duration: 1.5 }}
          />

          {/* Mobile timeline line */}
          <motion.div
            className="absolute left-4 top-0 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-400 md:hidden"
            initial={{ height: 0 }}
            animate={{ height: isInView ? "100%" : 0 }}
            transition={{ duration: 1.5 }}
          />

          {education.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isInView={isInView}
              isHovered={hoveredItem === item.id}
              onHover={() => setHoveredItem(item.id)}
              onLeave={() => setHoveredItem(null)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
  isMobile,
}: {
  item: EducationItem;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  const isEven = index % 2 === 0;
  const alignmentClasses = isMobile
    ? "flex-col text-left pl-12"
    : isEven
    ? "md:flex-row text-left"
    : "md:flex-row-reverse text-left";

  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: false, amount: 0.3 });

  // For mobile always show the content on the right side
  const mobilePosition = "left-4";

  return (
    <motion.div
      ref={itemRef}
      className={`flex ${alignmentClasses} items-center mb-12 md:mb-16 last:mb-0 relative`}
      initial={{ opacity: 0, x: isMobile ? -20 : isEven ? -50 : 50 }}
      animate={{
        opacity: isInView && itemInView ? 1 : 0,
        x: isInView && itemInView ? 0 : isMobile ? -20 : isEven ? -50 : 50,
      }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute ${
          isMobile ? mobilePosition : "left-1/2"
        } transform ${
          isMobile ? "" : "-translate-x-1/2"
        } w-4 md:w-5 h-4 md:h-5 rounded-full bg-gradient-to-r ${
          item.color
        } shadow-lg z-10`}
        initial={{ scale: 0 }}
        animate={{ scale: isInView && itemInView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
        whileHover={{ scale: 1.5 }}
      >
        {/* Pulsing effect for the dot */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-30"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.div>

      {/* Content */}
      {!isMobile && <div className="w-1/2" />}
      <motion.div
        className={`${isMobile ? "w-full" : "w-1/2"} ${
          isMobile ? "" : isEven ? "pr-12" : "pl-12"
        }`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`backdrop-blur-sm bg-gray-800/80 p-5 md:p-6 rounded-xl shadow-lg border border-gray-700 ${
            isHovered
              ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-opacity-50 ring-blue-400"
              : ""
          }`}
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px 5px rgba(56, 189, 248, 0.1)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.9)" }}
        >
          <div
            className={`px-3 py-1 rounded-full inline-block text-xs font-semibold mb-3 bg-gradient-to-r ${item.color} bg-opacity-20 text-white backdrop-blur-sm`}
          >
            {item.years}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">
            {item.degree}
          </h3>
          <div className="flex flex-col md:flex-row md:items-center mb-4 gap-2">
            <span className="text-gray-300 font-medium">
              {item.institution}
            </span>
            {item.gpa && (
              <span className="md:ml-4 px-2 py-1 bg-gray-700/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-300 inline-block w-fit">
                GPA: {item.gpa}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{item.location}</p>

          <AnimatePresence>
            {(isHovered || isMobile) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
