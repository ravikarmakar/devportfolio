import { memo, useRef, useEffect, useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import DynamicIcon from "../../../components/icon/IconImport";

import { useSkillStore } from "../../../store/useSkillStore";

// Official tech icons from devicons CDN
const techIcons: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
};

const getIconUrl = (name: string): string | null => {
  return techIcons[name.toLowerCase()] || null;
};

// Simple skill item with icon
const SkillItem = memo<{
  name: string;
  index: number;
}>(({ name, index }) => {
  const iconUrl = getIconUrl(name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center gap-3 p-4"
    >
      {/* Icon container */}
      <div className="w-16 h-16 rounded-xl bg-gray-800/50 border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-2xl">⚡</span>
        )}
      </div>

      {/* Name */}
      <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
});

SkillItem.displayName = "SkillItem";

// Marquee badge
const MarqueeBadge = memo<{ name: string }>(({ name }) => {
  const iconUrl = getIconUrl(name);

  return (
    <div className="inline-flex items-center justify-center gap-3.5 px-5 py-2.5 rounded-full bg-gray-800/40 border border-white/10 whitespace-nowrap">
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="w-5 h-5 flex-shrink-0" loading="lazy" />
      ) : (
        <span className="text-base leading-none">⚡</span>
      )}
      <span className="text-sm font-medium text-gray-200 leading-none">{name}</span>
    </div>
  );
});

MarqueeBadge.displayName = "MarqueeBadge";

// Simple marquee with edge blur
const Marquee = memo<{
  children: React.ReactNode;
  direction?: "left" | "right";
}>(({ children, direction = "left" }) => (
  <div className="relative overflow-hidden">
    {/* Left fade - gradual */}
    <div
      className="absolute left-0 top-0 bottom-0 w-28 md:w-44 z-10 pointer-events-none"
      style={{
        background: "linear-gradient(to right, #0A0A0B 0%, #0A0A0B 10%, rgba(10,10,11,0.8) 30%, rgba(10,10,11,0.4) 60%, transparent 100%)"
      }}
    />

    {/* Right fade - gradual */}
    <div
      className="absolute right-0 top-0 bottom-0 w-28 md:w-44 z-10 pointer-events-none"
      style={{
        background: "linear-gradient(to left, #0A0A0B 0%, #0A0A0B 10%, rgba(10,10,11,0.8) 30%, rgba(10,10,11,0.4) 60%, transparent 100%)"
      }}
    />

    <motion.div
      className="flex gap-3"
      animate={{ x: direction === "left" ? "-50%" : "0%" }}
      initial={{ x: direction === "left" ? "0%" : "-50%" }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  </div>
));


Marquee.displayName = "Marquee";

// --- Creative Overhaul: Aurora Galaxy Design ---

const CategoryIcon = DynamicIcon;

// Premium 3D Tilt Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = (y - centerY) / 10;
    const rY = (centerX - x) / 10;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Main component
const SkillSection = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { Skills, Categories, fetchSkills, fetchCategories, isLoading } = useSkillStore();

  useEffect(() => {
    if (Skills.length === 0) fetchSkills();
    if (Categories.length === 0) fetchCategories();
  }, [Skills.length, Categories.length, fetchSkills, fetchCategories]);

  // Enhanced Marquee Split
  const firstHalf = useMemo(() => Skills.slice(0, Math.ceil(Skills.length / 2)), [Skills]);
  const secondHalf = useMemo(() => Skills.slice(Math.ceil(Skills.length / 2)), [Skills]);

  // Dummy Proficiency Data for Visual Excellence (as requested)
  const getProficiency = (name: string) => {
    const low = ['assembly', 'c', 'jest'];
    if (low.includes(name.toLowerCase())) return 65;
    const mid = ['python', 'aws', 'docker'];
    if (mid.includes(name.toLowerCase())) return 80;
    return 95; // Default pro
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#0A0A0B]">
      {/* Aurora Glow Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-blue-400 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300/80">
              Technical Arsenal
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight">
            <span className="text-white">Mastered </span>
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                Ecosystems
              </span>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-blue-500/10 -rotate-1 -z-10" />
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Architecting the future with a curated stack of high-performance technologies and creative tools.
          </p>
        </motion.div>

        {/* Ambient Marquee - "Don't remove this part it looks so much beautiful" */}
        {!isLoading && Skills.length > 0 && (
          <div className="relative mb-24 py-10">
            <div className="absolute inset-0 bg-blue-500/5 -skew-y-1 scale-110 blur-sm pointer-events-none bg-[#0A0A0B]" />
            <div className="space-y-6 relative">
              <Marquee direction="left">
                {firstHalf.map((skill) => (
                  <MarqueeBadge key={skill._id || skill.name} name={skill.name} />
                ))}
              </Marquee>
              <Marquee direction="right">
                {secondHalf.map((skill) => (
                  <MarqueeBadge key={skill._id || skill.name} name={skill.name} />
                ))}
              </Marquee>
            </div>
          </div>
        )}

        {/* Dynamic Bento Galaxy */}
        {!isLoading && Categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 items-stretch">
            {Categories.map((category, idx) => {
              // Create dynamic sizes for a true "Bento" look
              const isLarge = idx === 0; // First one is featured
              const gridSpan = isLarge
                ? "md:col-span-6 lg:col-span-8 h-full"
                : idx === 1
                  ? "md:col-span-3 lg:col-span-4"
                  : "md:col-span-3 lg:col-span-4";

              return (
                <div key={category._id} className={gridSpan}>
                  <TiltCard className="h-full">
                    <div className="relative h-full p-8 rounded-[2rem] bg-[#0F0F12] border border-white/5 group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Glass-Silicon Background Pattern */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-blue-500/10 transition-colors" />

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                            <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                              {/* {category.iconName || "⚡"} */}
                              <CategoryIcon iconName={category.iconName || category.title} />
                            </span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mt-1">
                              {category.skills?.length || 0} Technologies
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-grow">
                          {category.skills?.map((skill) => (
                            <div key={skill._id} className="group/skill relative py-2">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getIconUrl(skill.name) && (
                                    <img src={getIconUrl(skill.name)!} alt={skill.name} className="w-5 h-5 opacity-70 group-hover/skill:opacity-100 transition-opacity" />
                                  )}
                                  <span className="text-sm font-medium text-gray-400 group-hover/skill:text-white transition-colors">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-600 font-mono">
                                  {getProficiency(skill.name)}%
                                </span>
                              </div>
                              {/* Proficiency Bar */}
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${getProficiency(skill.name)}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover/skill:from-cyan-400 group-hover/skill:to-blue-600"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Footer Decoration */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                          <span className="text-[10px] text-blue-400/60 font-mono tracking-tighter italic">
                            OPTIMIZED_ENGINE_v2.0
                          </span>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-blue-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-[2rem] border border-white/10" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});



SkillSection.displayName = "SkillSection";

export default SkillSection;
