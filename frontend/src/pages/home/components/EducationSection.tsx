import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen py-20 px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white">Education</span>
            <span className="text-blue-500"> Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic background that has shaped my technical expertise and
            professional approach
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px h-full bg-gray-700"
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
}: {
  item: EducationItem;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isEven = index % 2 === 0;
  const alignmentClasses = isEven
    ? "md:flex-row text-right"
    : "md:flex-row-reverse text-left";

  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={itemRef}
      className={`flex ${alignmentClasses} items-center mb-16 last:mb-0 relative`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{
        opacity: isInView && itemInView ? 1 : 0,
        x: isInView && itemInView ? 0 : isEven ? -50 : 50,
      }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r ${item.color} shadow-lg z-10`}
        initial={{ scale: 0 }}
        animate={{ scale: isInView && itemInView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
        whileHover={{ scale: 1.5 }}
      />

      {/* Content */}
      <div className="w-1/2" />
      <motion.div
        className={`w-1/2 ${isEven ? "pr-12" : "pl-12"}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 ${
            isHovered
              ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-opacity-50"
              : ""
          }`}
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.8)" }}
        >
          <div
            className={`px-3 py-1 rounded-full inline-block text-xs font-semibold mb-3 bg-gradient-to-r ${item.color} bg-opacity-20 text-white`}
          >
            {item.years}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.degree}</h3>
          <div className="flex items-center mb-4">
            <span className="text-gray-300 font-medium">
              {item.institution}
            </span>
            {item.gpa && (
              <span className="ml-4 px-2 py-1 bg-gray-700 rounded-full text-xs font-medium text-gray-300">
                GPA: {item.gpa}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{item.location}</p>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="h-px bg-gray-700 my-4" />
            <p className="text-gray-300 text-sm">{item.description}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
