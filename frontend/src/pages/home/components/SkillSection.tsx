import { memo, useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

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
        background: "linear-gradient(to right, #121212 0%, #121212 15%, rgba(18,18,18,0.7) 50%, rgba(18,18,18,0.3) 75%, transparent 100%)"
      }}
    />

    {/* Right fade - gradual */}
    <div
      className="absolute right-0 top-0 bottom-0 w-28 md:w-44 z-10 pointer-events-none"
      style={{
        background: "linear-gradient(to left, #121212 0%, #121212 15%, rgba(18,18,18,0.7) 50%, rgba(18,18,18,0.3) 75%, transparent 100%)"
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

// Main component
const SkillSection = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { Skills, fetchSkills, isLoading } = useSkillStore();

  useEffect(() => {
    if (Skills.length === 0) fetchSkills();
  }, [Skills.length, fetchSkills]);

  const firstHalf = useMemo(
    () => Skills.slice(0, Math.ceil(Skills.length / 2)),
    [Skills]
  );
  const secondHalf = useMemo(
    () => Skills.slice(Math.ceil(Skills.length / 2)),
    [Skills]
  );

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-300">
              Skills & Technologies
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Technologies I </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Work With
            </span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Building modern applications with the latest tools and frameworks
          </p>
        </motion.div>

        {/* Marquee */}
        {!isLoading && Skills.length > 0 && (
          <div className="space-y-3 mb-20">
            <Marquee direction="left">
              {firstHalf.map((skill) => (
                <MarqueeBadge key={skill._id || skill.name} name={skill.name} />
              ))}
            </Marquee>
            {secondHalf.length > 0 && (
              <Marquee direction="right">
                {secondHalf.map((skill) => (
                  <MarqueeBadge key={skill._id || skill.name} name={skill.name} />
                ))}
              </Marquee>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex gap-3 overflow-hidden mb-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-28 h-8 bg-gray-800/30 rounded-full animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        )}

        {/* Skills Categories - Bento Grid */}
        {!isLoading && Skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Frontend Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Skills.filter(s =>
                  ['react', 'javascript', 'typescript', 'html', 'css', 'tailwind css', 'tailwindcss', 'next.js', 'nextjs', 'redux', 'sass', 'bootstrap']
                    .includes(s.name.toLowerCase())
                ).slice(0, 6).map((skill) => (
                  <div key={skill._id || skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-white/5">
                    {getIconUrl(skill.name) && (
                      <img src={getIconUrl(skill.name)!} alt={skill.name} className="w-4 h-4" loading="lazy" />
                    )}
                    <span className="text-xs text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10 hover:border-green-500/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="text-xl">⚙️</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Skills.filter(s =>
                  ['node.js', 'nodejs', 'express', 'express.js', 'mongodb', 'postgresql', 'mysql', 'graphql', 'python', 'restful apis', 'firebase']
                    .includes(s.name.toLowerCase())
                ).slice(0, 6).map((skill) => (
                  <div key={skill._id || skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-white/5">
                    {getIconUrl(skill.name) && (
                      <img src={getIconUrl(skill.name)!} alt={skill.name} className="w-4 h-4" loading="lazy" />
                    )}
                    <span className="text-xs text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tools & Others Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 hover:border-purple-500/20 transition-colors md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <span className="text-xl">🛠️</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Tools & DevOps</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Skills.filter(s =>
                  ['git', 'github', 'docker', 'linux', 'figma', 'vscode', 'aws', 'vercel', 'jest', 'security', 'npm']
                    .includes(s.name.toLowerCase())
                ).slice(0, 6).map((skill) => (
                  <div key={skill._id || skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-white/5">
                    {getIconUrl(skill.name) && (
                      <img src={getIconUrl(skill.name)!} alt={skill.name} className="w-4 h-4" loading="lazy" />
                    )}
                    <span className="text-xs text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
});

SkillSection.displayName = "SkillSection";

export default SkillSection;
