import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skills } from "../../../lib/Context";

export default function SkillSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    // Simulate intersection observer
    setIsInView(true);
  }, []);

  // Calculate experience level text
  const getExperienceText = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  // Define your skills
  const skillss = [
    { name: "React", level: 95, icon: "⚛️", color: "#61DAFB" },
    { name: "TypeScript", level: 90, icon: "🔷", color: "#3178C6" },
    { name: "Next.js", level: 88, icon: "▲", color: "#ffffff" },
    { name: "Node.js", level: 85, icon: "🟢", color: "#339933" },
    { name: "GraphQL", level: 82, icon: "◈", color: "#E535AB" },
    { name: "Tailwind", level: 92, icon: "🌊", color: "#38BDF8" },
    { name: "Docker", level: 75, icon: "🐳", color: "#2496ED" },
    { name: "AWS", level: 78, icon: "☁️", color: "#FF9900" },
  ];

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-16">
          <motion.h2
            className="text-2xl lg:text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">My</span>{" "}
            <span className="bg-clip-text text-blue-500">Tech Stack</span>
          </motion.h2>
          <p className="dark:text-gray-300 text-gray-600 max-w-2xl mx-auto text-center">
            Specialized in modern web technologies with a focus on building
            scalable and performant applications
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mb-20">
          {skills.map((category, idx) => (
            <motion.div
              key={category.category}
              className="flex-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div
                className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <span className="text-3xl">
                  {category.category === "Frontend"
                    ? "📱"
                    : category.category === "Backend"
                    ? "⚙️"
                    : "🚀"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-center text-white mb-8">
                {category.category}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`bg-gray-800 rounded-xl p-4 cursor-pointer transition-all ${
                      activeSkill === skill.name
                        ? "ring-2 ring-blue-400 shadow-blue-400/20 shadow-lg"
                        : ""
                    }`}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(49, 46, 81, 0.7)",
                    }}
                    onClick={() =>
                      setActiveSkill(
                        activeSkill === skill.name ? null : skill.name
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{skill.icon}</span>
                        <h4 className="text-lg font-medium text-white">
                          {skill.name}
                        </h4>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                        {getExperienceText(skill.level)}
                      </span>
                    </div>

                    <motion.div
                      className="h-1 bg-gray-700 rounded-full w-full overflow-hidden"
                      initial={{ opacity: 0.5 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className={`h-full rounded-full ${
                          category.category === "Frontend"
                            ? "bg-blue-400"
                            : category.category === "Backend"
                            ? "bg-green-400"
                            : "bg-purple-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.1 }}
                      />
                    </motion.div>

                    {activeSkill === skill.name && (
                      <motion.div
                        className="mt-4 text-sm text-gray-300"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{skill.description}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-800 p-6 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-4">
            Always expanding my skills and staying current with latest
            technologies
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">
              Next.js
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-green-300">
              GraphQL
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-purple-300">
              AWS
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-yellow-300">
              Testing
            </span>
          </div>
        </motion.div>

        {/* Alternative Skills Circle View */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4 relative overflow-hidden"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 blur-3xl">
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-600 rounded-full"
                animate={{
                  x: [0, -30, 0],
                  y: [0, -20, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-600 rounded-full"
                animate={{
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
              {skillss.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-lg relative">
                    {/* Background pulse animation when hovered */}
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.15, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.4 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                          background: `radial-gradient(circle, ${skill.color} 0%, rgba(0,0,0,0) 70%)`,
                        }}
                      />
                    )}

                    {/* Skill progress circle */}
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Subtle background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                      />

                      {/* Dotted reference circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        strokeDasharray="1,5"
                        className="opacity-70"
                      />

                      {/* Main skill progress circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={`url(#skillGradient-${index})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${skill.level * 2.64} 264`}
                        strokeDashoffset="66"
                        initial={{ strokeDasharray: "0 264" }}
                        whileInView={{
                          strokeDasharray: `${skill.level * 2.64} 264`,
                        }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 1.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        viewport={{ once: true }}
                      />

                      {/* Custom gradient for each skill */}
                      <defs>
                        <linearGradient
                          id={`skillGradient-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor={skill.color} />
                          <stop
                            offset="100%"
                            stopColor={
                              skill.color === "#ffffff"
                                ? "#a1a1aa"
                                : skill.color
                            }
                            stopOpacity="0.6"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Outer decorative ring */}
                    <motion.div
                      className="absolute inset-[-2px] rounded-full border border-gray-700"
                      animate={{
                        boxShadow:
                          hoveredSkill === skill.name
                            ? [
                                `0 0 0 1px rgba(${parseInt(
                                  skill.color.slice(1, 3),
                                  16
                                )}, ${parseInt(
                                  skill.color.slice(3, 5),
                                  16
                                )}, ${parseInt(
                                  skill.color.slice(5, 7),
                                  16
                                )}, 0.3)`,
                                `0 0 15px 2px rgba(${parseInt(
                                  skill.color.slice(1, 3),
                                  16
                                )}, ${parseInt(
                                  skill.color.slice(3, 5),
                                  16
                                )}, ${parseInt(
                                  skill.color.slice(5, 7),
                                  16
                                )}, 0.4)`,
                              ]
                            : `0 0 0 1px rgba(255, 255, 255, 0.05)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Skill content */}
                    <div className="flex flex-col items-center justify-center text-center z-10 p-2">
                      <span className="text-xl mb-1">{skill.icon}</span>
                      <p className="text-base font-medium text-white">
                        {skill.name}
                      </p>
                      <motion.p
                        className="text-xs font-mono mt-1"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredSkill === skill.name ? 1 : 0.6,
                        }}
                        style={{ color: skill.color }}
                      >
                        {skill.level}%
                      </motion.p>
                    </div>
                  </div>

                  {/* Skill name with glow effect */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      y: hoveredSkill === skill.name ? 0 : -5,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      boxShadow:
                        hoveredSkill === skill.name
                          ? `0 0 10px 2px rgba(${parseInt(
                              skill.color.slice(1, 3),
                              16
                            )}, ${parseInt(
                              skill.color.slice(3, 5),
                              16
                            )}, ${parseInt(skill.color.slice(5, 7), 16)}, 0.15)`
                          : "none",
                    }}
                  >
                    <p className="text-xs font-medium whitespace-nowrap">
                      <span className="text-white">
                        {skill.level}% proficiency
                      </span>
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Subtle decorative line */}
            <motion.div
              className="w-full h-px max-w-md mx-auto my-16 opacity-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #fff 50%, transparent)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 0.2, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />

            {/* Additional skill categories */}
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                { name: "UI/UX Design", level: 85, color: "#F97316" },
                {
                  name: "Performance Optimization",
                  level: 88,
                  color: "#22C55E",
                },
                { name: "Responsive Design", level: 92, color: "#8B5CF6" },
                { name: "API Integration", level: 90, color: "#EC4899" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                    boxShadow: `0 10px 20px -10px rgba(${parseInt(
                      skill.color.slice(1, 3),
                      16
                    )}, ${parseInt(skill.color.slice(3, 5), 16)}, ${parseInt(
                      skill.color.slice(5, 7),
                      16
                    )}, 0.3)`,
                  }}
                >
                  <p className="text-gray-300 font-medium mb-2">{skill.name}</p>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom decorative particles */}
          <div className="absolute bottom-0 left-0 w-full h-20 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-blue-500"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  bottom: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, 10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
