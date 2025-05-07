import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
  skills?: Skill[];
}

const Skills: React.FC<SkillsSectionProps> = ({
  title = "Professional Skills",
  subtitle = "A curated collection of my technical expertise and professional capabilities",
  skills = [
    { name: "React", level: 92, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "Framer Motion", level: 86, category: "Animation" },
    { name: "UI/UX Design", level: 82, category: "Design" },
    { name: "Next.js", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 94, category: "Frontend" },
    { name: "Figma", level: 80, category: "Design" },
    { name: "GraphQL", level: 75, category: "Backend" },
    { name: "Responsive Design", level: 92, category: "Frontend" },
  ],
}) => {
  // Get unique categories
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Elegant animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for elegant motion
      },
    },
  };

  const skillVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (delay: number) => ({
      width: "100%",
      opacity: 1,
      transition: {
        width: {
          delay: 0.1 + delay * 0.1,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          delay: 0.1 + delay * 0.1,
          duration: 0.8,
        },
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + delay * 0.08,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineReveal = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ opacity }}
    >
      {/* Subtle Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "120px 120px",
          y: backgroundY,
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.p
            className="text-blue-600 uppercase tracking-widest text-sm font-medium mb-2"
            variants={fadeIn}
          >
            Expertise
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl font-light text-gray-900 mb-5"
            variants={fadeIn}
          >
            {title}
          </motion.h2>

          <motion.div
            className="h-px w-24 bg-blue-600 mx-auto mb-6"
            variants={lineReveal}
          />

          <motion.p
            className="text-gray-600 max-w-xl mx-auto"
            variants={fadeIn}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Skills Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.div
                key={category}
                className="bg-white rounded-md shadow-sm p-6 border border-gray-100"
                variants={cardVariants}
                custom={categoryIndex}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {category}
                </h3>

                <div className="space-y-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800">{skill.name}</span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                          variants={skillVariants}
                          custom={categoryIndex + skillIndex * 0.1}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alternative Skills Circle View */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-medium text-gray-900 mb-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              Skills Overview
            </motion.span>
          </h3>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {skills.slice(0, 8).map((skill, index) => (
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
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-sm relative">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#skillGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.level * 2.51} 251`}
                      strokeDashoffset="62.75"
                      initial={{ strokeDasharray: "0 251" }}
                      whileInView={{
                        strokeDasharray: `${skill.level * 2.51} 251`,
                      }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 1.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      viewport={{ once: true }}
                    />
                    <defs>
                      <linearGradient
                        id="skillGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center z-10">
                    <p className="text-sm font-medium text-gray-800">
                      {skill.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // Define your skills with icons and levels
// const skillsData = [
//   {
//     name: "React",
//     level: 90,
//     icon: "⚛️",
//     color: "from-blue-400 to-cyan-300",
//   },
//   {
//     name: "TypeScript",
//     level: 85,
//     icon: "🔷",
//     color: "from-blue-500 to-indigo-400",
//   },
//   {
//     name: "JavaScript",
//     level: 95,
//     icon: "🟨",
//     color: "from-yellow-400 to-amber-300",
//   },
//   {
//     name: "Node.js",
//     level: 80,
//     icon: "🟢",
//     color: "from-green-500 to-emerald-400",
//   },
//   {
//     name: "GraphQL",
//     level: 75,
//     icon: "🔺",
//     color: "from-pink-500 to-rose-400",
//   },
//   {
//     name: "MongoDB",
//     level: 70,
//     icon: "🍃",
//     color: "from-green-400 to-teal-300",
//   },
//   {
//     name: "AWS",
//     level: 65,
//     icon: "☁️",
//     color: "from-orange-400 to-amber-300",
//   },
//   {
//     name: "Docker",
//     level: 60,
//     icon: "🐳",
//     color: "from-blue-400 to-sky-300",
//   },
// ];

// export default function SkillsSection() {
//   const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     // Auto-rotate through skills
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % skillsData.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full bg-black text-white p-6 relative overflow-hidden">
//       {/* Background animated shapes */}
//       <div className="absolute inset-0 opacity-10">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-purple-500"
//             style={{
//               width: `${Math.random() * 200 + 50}px`,
//               height: `${Math.random() * 200 + 50}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               x: [0, Math.random() * 50 - 25],
//               y: [0, Math.random() * 50 - 25],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
//         ))}
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative z-10"
//       >
//         <motion.h2
//           className="text-5xl font-bold mb-12 text-center"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
//             Technical Expertise
//           </span>
//         </motion.h2>

//         {/* 3D Rotating Hexagon Skills */}
//         <motion.div
//           className="flex justify-center items-center h-80 mb-16 perspective"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           <div className="relative w-96 h-96">
//             {skillsData.map((skill, index) => (
//               <motion.div
//                 key={skill.name}
//                 className={`absolute inset-0 flex items-center justify-center`}
//                 initial={{ opacity: 0, rotateY: index * 45, scale: 0.8 }}
//                 animate={{
//                   opacity: index === activeIndex ? 1 : 0.2,
//                   rotateY: index * 45 + activeIndex * -45,
//                   scale: index === activeIndex ? 1 : 0.8,
//                   z: index === activeIndex ? 200 : 0,
//                 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <motion.div
//                   className={`w-64 h-64 flex flex-col items-center justify-center bg-gradient-to-br ${skill.color} rounded-xl shadow-lg transform -rotate-6 p-6`}
//                   whileHover={{ rotate: 0, scale: 1.05 }}
//                   onClick={() => setActiveIndex(index)}
//                 >
//                   <span className="text-5xl mb-4">{skill.icon}</span>
//                   <h3 className="text-2xl font-bold text-white">
//                     {skill.name}
//                   </h3>
//                   <div className="mt-4 w-full bg-black bg-opacity-30 h-2 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-full bg-white`}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${skill.level}%` }}
//                       transition={{ duration: 1, delay: 0.2 }}
//                     />
//                   </div>
//                   <p className="mt-2 font-medium">{skill.level}%</p>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Skill Pills */}
//         <motion.div
//           className="flex flex-wrap justify-center gap-3 relative z-10"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.5 }}
//         >
//           {skillsData.map((skill, index) => (
//             <motion.button
//               key={skill.name}
//               className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
//                 index === activeIndex
//                   ? `bg-gradient-to-r ${skill.color} text-white`
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveIndex(index)}
//               whileHover={{ y: -5, scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onHoverStart={() => setHoveredSkill(index)}
//               onHoverEnd={() => setHoveredSkill(null)}
//             >
//               <span>{skill.icon}</span>
//               {skill.name}
//             </motion.button>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Glowing effect for dark background */}
//       <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
//       <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
//     </div>
//   );
// }
