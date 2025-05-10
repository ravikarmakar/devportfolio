import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// Define your skills
const skills = [
  {
    name: "React",
    level: 95,
    color: "#61DAFB",
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 90,
    color: "#3178C6",
    category: "frontend",
  },
  {
    name: "Three.js",
    level: 85,
    color: "#8400ff",
    category: "frontend",
  },
  {
    name: "Node.js",
    level: 88,
    color: "#339933",
    category: "backend",
  },
  {
    name: "GraphQL",
    level: 82,
    color: "#E535AB",
    category: "backend",
  },
  {
    name: "Docker",
    level: 78,
    color: "#2496ED",
    category: "devops",
  },
  {
    name: "AWS",
    level: 75,
    color: "#FF9900",
    category: "devops",
  },
  {
    name: "Figma",
    level: 92,
    color: "#F24E1E",
    category: "design",
  },
];

export default function FuturisticSkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mode, setMode] = useState("grid"); // grid, network, radar
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Mouse position tracking for hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-change mode every 10 seconds
  useEffect(() => {
    const modes = ["grid", "network", "radar"];
    const interval = setInterval(() => {
      setMode((prev) => {
        const currentIndex = modes.indexOf(prev);
        return modes[(currentIndex + 1) % modes.length];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Animation when mode changes
  useEffect(() => {
    controls.start({
      opacity: [0.5, 1],
      scale: [0.95, 1],
      transition: { duration: 0.5 },
    });
  }, [mode, controls]);

  // Generate random position within container
  interface Position {
    x: string;
    y: string;
  }

  const getRandomPosition = (index: number): Position => {
    const offset = 150;
    const baseX = (index % 4) * (100 / 3);
    const baseY = Math.floor(index / 4) * (100 / 2);

    return {
      x: `${baseX + Math.random() * 10}%`,
      y: `${baseY + Math.random() * 10}%`,
    };
  };

  // Calculate positions for network mode
  interface NetworkPosition {
    x: string;
    y: string;
  }

  const getNetworkPosition = (
    index: number,
    total: number
  ): NetworkPosition => {
    const radius = 40;
    const angle = (index / total) * Math.PI * 2;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    return { x: `${x}%`, y: `${y}%` };
  };

  // Calculate positions for radar mode
  interface RadarPosition {
    x: string;
    y: string;
  }

  const getRadarPosition = (index: number, level: number): RadarPosition => {
    const angle = (index / skills.length) * Math.PI * 2;
    const distanceFromCenter = (level / 100) * 40; // Scale based on skill level
    const x = 50 + distanceFromCenter * Math.cos(angle);
    const y = 50 + distanceFromCenter * Math.sin(angle);

    return { x: `${x}%`, y: `${y}%` };
  };

  // Get position based on current mode
  interface Skill {
    name: string;
    level: number;
    color: string;
    category: string;
  }

  interface Position {
    x: string;
    y: string;
  }

  const getPosition = (skill: Skill, index: number): Position => {
    switch (mode) {
      case "network":
        return getNetworkPosition(index, skills.length);
      case "radar":
        return getRadarPosition(index, skill.level);
      default:
        return getRandomPosition(index);
    }
  };

  return (
    <div
      className="w-full bg-black text-white min-h-screen relative overflow-hidden"
      ref={containerRef}
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-blue-500 w-full"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [1, 1.1, 1],
              }}
              transition={{
                duration: 3 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-blue-500 h-full"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${
                Math.random() * 100 + 100
              }, ${Math.random() * 100 + 100}, ${
                Math.random() * 200 + 55
              }, 0.7) 0%, rgba(0,0,0,0) 70%)`,
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h2
            className="text-6xl font-bold text-center mb-6"
            animate={{
              textShadow: [
                "0 0 8px rgba(100,100,255,0.3)",
                "0 0 16px rgba(100,100,255,0.6)",
                "0 0 8px rgba(100,100,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Technical Proficiency
            </span>
          </motion.h2>

          <div className="flex justify-center gap-4 mb-6">
            {["grid", "network", "radar"].map((viewMode) => (
              <motion.button
                key={viewMode}
                className={`px-4 py-2 rounded-md text-sm uppercase tracking-wider ${
                  mode === viewMode
                    ? "bg-blue-600 border border-blue-400 shadow-lg shadow-blue-500/20"
                    : "bg-gray-900 border border-gray-700"
                }`}
                onClick={() => setMode(viewMode)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {viewMode}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Interactive skill visualization */}
        <motion.div className="w-full h-96 relative mb-16" animate={controls}>
          {/* Connection lines in network mode */}
          {mode === "network" &&
            skills.map((skill, i) =>
              skills.map((targetSkill, j) => {
                if (i < j) {
                  // To avoid duplicating lines
                  const start = getNetworkPosition(i, skills.length);
                  const end = getNetworkPosition(j, skills.length);
                  return (
                    <motion.div
                      key={`line-${i}-${j}`}
                      className="absolute top-0 left-0 w-px bg-blue-500/20"
                      style={{
                        width: "100%",
                        height: "1px",
                        transformOrigin: "0 0",
                        top: `${start.y}`,
                        left: `${start.x}`,
                      }}
                      animate={{
                        rotate:
                          Math.atan2(
                            parseFloat(end.y) - parseFloat(start.y),
                            parseFloat(end.x) - parseFloat(start.x)
                          ) *
                          (180 / Math.PI),
                        scaleX:
                          Math.sqrt(
                            Math.pow(
                              parseFloat(end.x) - parseFloat(start.x),
                              2
                            ) +
                              Math.pow(
                                parseFloat(end.y) - parseFloat(start.y),
                                2
                              )
                          ) / 100,
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        opacity: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      }}
                    />
                  );
                }
                return null;
              })
            )}

          {/* Radar background */}
          {mode === "radar" && (
            <>
              {[20, 40, 60, 80, 100].map((level) => (
                <motion.div
                  key={`radar-${level}`}
                  className="absolute rounded-full border border-blue-500/20"
                  style={{
                    width: `${level * 0.8}%`,
                    height: `${level * 0.8}%`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}

              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                  <motion.div
                    key={`radar-line-${i}`}
                    className="absolute bg-blue-500/20 h-px"
                    style={{
                      width: "40%",
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                    }}
                  />
                );
              })}
            </>
          )}

          {/* Skill nodes */}
          <AnimatePresence>
            {skills.map((skill, index) => {
              const position = getPosition(skill, index);
              return (
                <motion.div
                  key={skill.name}
                  className="absolute"
                  style={{
                    top: position.y,
                    left: position.x,
                  }}
                  animate={{
                    top: position.y,
                    left: position.x,
                    x: "-50%",
                    y: "-50%",
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    },
                  }}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  onClick={() =>
                    setActiveSkill(
                      skill.name === activeSkill ? null : skill.name
                    )
                  }
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <motion.div
                    className="cursor-pointer"
                    animate={{
                      boxShadow: [
                        `0 0 10px ${skill.color}50`,
                        `0 0 20px ${skill.color}70`,
                        `0 0 10px ${skill.color}50`,
                      ],
                      scale:
                        hoveredSkill === skill.name ||
                        activeSkill === skill.name
                          ? 1.1
                          : 1,
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                      },
                      scale: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <div
                      className={`relative rounded-full flex items-center justify-center ${
                        activeSkill === skill.name ? "w-20 h-20" : "w-16 h-16"
                      }`}
                      style={{
                        backgroundColor: `${skill.color}20`,
                        border: `2px solid ${skill.color}`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
                        }}
                      />
                      <p className="font-medium text-sm relative z-10">
                        {skill.name}
                      </p>
                    </div>

                    {/* Expanding info on active skill */}
                    <AnimatePresence>
                      {activeSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 rounded-lg"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${skill.color}`,
                            zIndex: 20,
                            width: "150px",
                          }}
                        >
                          <div className="mb-2">
                            <p className="text-sm opacity-70">Proficiency</p>
                            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: skill.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                            <p className="text-right text-xs mt-1">
                              {skill.level}%
                            </p>
                          </div>
                          <p className="text-xs opacity-70 capitalize">
                            {skill.category}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Mouse follower effect */}
          <motion.div
            className="pointer-events-none absolute w-40 h-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(100, 200, 255, 0.05) 0%, rgba(0,0,0,0) 70%)",
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Skill categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {["frontend", "backend", "devops", "design"].map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            return (
              <motion.div
                key={category}
                className="bg-black bg-opacity-70 backdrop-blur-lg p-4 rounded-xl border border-blue-900/50"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 255, 0.3)",
                  borderColor: "rgba(100, 200, 255, 0.5)",
                }}
              >
                <h3 className="text-xl font-bold mb-3 capitalize bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      <p className="text-sm">{skill.name}</p>
                      <div className="flex-grow h-px bg-gray-800"></div>
                      <p className="text-xs text-gray-400">{skill.level}%</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
