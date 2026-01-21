import { memo, useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Zap } from "lucide-react";
import { useSkillStore } from "../../store/useSkillStore";


// Helper function for hex to rgba
const hexToRgba = (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Tech icon mappings with official devicon URLs
const techIcons: Record<string, { icon: string; color: string }> = {
    react: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB",
    },
    javascript: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "#F7DF1E",
    },
    typescript: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "#3178C6",
    },
    nodejs: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
    },
    "node.js": {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
    },
    mongodb: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248",
    },
    express: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "#FFFFFF",
    },
    nextjs: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        color: "#FFFFFF",
    },
    "next.js": {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        color: "#FFFFFF",
    },
    tailwindcss: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4",
    },
    "tailwind css": {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4",
    },
    html5: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26",
    },
    html: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26",
    },
    css3: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "#1572B6",
    },
    css: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "#1572B6",
    },
    git: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "#F05032",
    },
    github: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        color: "#FFFFFF",
    },
    docker: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        color: "#2496ED",
    },
    python: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "#3776AB",
    },
    redux: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        color: "#764ABC",
    },
    graphql: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        color: "#E10098",
    },
    postgresql: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        color: "#4169E1",
    },
    mysql: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        color: "#4479A1",
    },
    firebase: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        color: "#FFCA28",
    },
    figma: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        color: "#F24E1E",
    },
    vscode: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        color: "#007ACC",
    },
    sass: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
        color: "#CC6699",
    },
    bootstrap: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        color: "#7952B3",
    },
    aws: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        color: "#FF9900",
    },
    linux: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        color: "#FCC624",
    },
    npm: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
        color: "#CB3837",
    },
    jest: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
        color: "#C21325",
    },
    "framer motion": {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
        color: "#0055FF",
    },
    vercel: {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        color: "#FFFFFF",
    },
};

// Default colors for skills without specific icons
const defaultColors = [
    "#3B82F6", "#8B5CF6", "#EC4899", "#F97316", "#22C55E",
    "#06B6D4", "#EAB308", "#EF4444", "#14B8A6", "#6366F1",
];

// Get icon info for a skill
const getSkillIcon = (skillName: string, index: number) => {
    const key = skillName.toLowerCase();
    if (techIcons[key]) {
        return techIcons[key];
    }
    return {
        icon: null,
        color: defaultColors[index % defaultColors.length],
    };
};

// Memoized Skill Badge for Marquee
const SkillBadge = memo<{
    name: string;
    iconUrl: string | null;
    color: string;
}>(({ name, iconUrl, color }) => (
    <div
        className="flex items-center gap-3 px-5 py-2.5 rounded-full border whitespace-nowrap transition-all hover:scale-105 cursor-default"
        style={{
            backgroundColor: hexToRgba(color, 0.1),
            borderColor: hexToRgba(color, 0.3),
        }}
    >
        {iconUrl ? (
            <img src={iconUrl} alt={name} className="w-5 h-5" loading="lazy" />
        ) : (
            <span className="text-lg">⚡</span>
        )}
        <span className="font-medium text-white">{name}</span>
    </div>
));

SkillBadge.displayName = "SkillBadge";

// Floating Tech Icon with animations
const FloatingTechIcon = memo<{
    skill: { name: string; level: number };
    iconUrl: string | null;
    color: string;
    index: number;
    total: number;
}>(({ skill, iconUrl, color, index, total }) => {
    // Calculate position in a grid-like pattern
    const row = Math.floor(index / 4);
    const col = index % 4;

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                type: "spring",
                stiffness: 100,
            }}
            viewport={{ once: true }}
        >
            {/* Floating animation container */}
            <motion.div
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                }}
            >
                {/* Icon container */}
                <motion.div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${hexToRgba(color, 0.15)}, ${hexToRgba(color, 0.05)})`,
                        border: `1px solid ${hexToRgba(color, 0.2)}`,
                    }}
                    whileHover={{
                        scale: 1.15,
                        rotate: 5,
                        boxShadow: `0 0 30px ${hexToRgba(color, 0.4)}`,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Glow effect on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at center, ${hexToRgba(color, 0.3)}, transparent 70%)`,
                        }}
                    />

                    {/* Icon */}
                    {iconUrl ? (
                        <motion.img
                            src={iconUrl}
                            alt={skill.name}
                            className="w-10 h-10 md:w-12 md:h-12 relative z-10"
                            loading="lazy"
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        />
                    ) : (
                        <span className="text-3xl relative z-10">⚡</span>
                    )}

                    {/* Progress ring */}
                    <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke={hexToRgba(color, 0.1)}
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${skill.level * 2.89} 289`}
                            initial={{ strokeDasharray: "0 289" }}
                            whileInView={{ strokeDasharray: `${skill.level * 2.89} 289` }}
                            transition={{ duration: 1.5, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </svg>
                </motion.div>

                {/* Skill name tooltip */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        backgroundColor: hexToRgba(color, 0.9),
                        color: color === "#FFFFFF" || color === "#F7DF1E" ? "#000" : "#fff",
                    }}
                >
                    {skill.name}
                </motion.div>
            </motion.div>
        </motion.div>
    );
});

FloatingTechIcon.displayName = "FloatingTechIcon";

// Marquee component for infinite scroll
const Marquee = memo<{
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
}>(({ children, direction = "left", speed = 30 }) => (
    <div className="relative overflow-hidden">
        <motion.div
            className="flex gap-4"
            animate={{ x: direction === "left" ? "-50%" : "0%" }}
            initial={{ x: direction === "left" ? "0%" : "-50%" }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {children}
            {children}
        </motion.div>
    </div>
));

Marquee.displayName = "Marquee";

// Main SkillSection component
const SkillSection = memo(() => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    // Get skills from store
    const { Skills, fetchSkills, isLoading } = useSkillStore();

    // Fetch skills on mount
    useEffect(() => {
        if (Skills.length === 0) fetchSkills();
    }, [Skills.length, fetchSkills]);

    // Prepare skills with icons and colors
    const skillsWithIcons = useMemo(() => {
        return Skills.map((skill, i) => {
            const iconInfo = getSkillIcon(skill.name, i);
            return {
                ...skill,
                iconUrl: iconInfo.icon,
                color: iconInfo.color,
            };
        });
    }, [Skills]);

    // Split skills for marquee rows
    const firstRow = useMemo(
        () => skillsWithIcons.slice(0, Math.ceil(skillsWithIcons.length / 2)),
        [skillsWithIcons]
    );
    const secondRow = useMemo(
        () => skillsWithIcons.slice(Math.ceil(skillsWithIcons.length / 2)),
        [skillsWithIcons]
    );

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <div className="max-w-6xl mx-auto px-6 md:px-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <Zap size={14} className="text-blue-400" />
                            <span className="text-sm font-medium text-gray-300">
                                Skills & Technologies
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span className="text-white">Tech Stack I </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Work With
                            </span>
                        </motion.h2>

                        <motion.p
                            className="text-gray-400 text-lg max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Constantly evolving my toolkit to build modern, scalable
                            applications
                        </motion.p>
                    </motion.div>
                </div>

                {/* Marquee Skills - Full width */}
                {!isLoading && Skills.length > 0 && (
                    <div className="space-y-4 mb-20">
                        <Marquee direction="left" speed={40}>
                            {firstRow.map((skill) => (
                                <SkillBadge
                                    key={skill._id || skill.name}
                                    name={skill.name}
                                    iconUrl={skill.iconUrl}
                                    color={skill.color}
                                />
                            ))}
                        </Marquee>

                        {secondRow.length > 0 && (
                            <Marquee direction="right" speed={35}>
                                {secondRow.map((skill) => (
                                    <SkillBadge
                                        key={skill._id || skill.name}
                                        name={skill.name}
                                        iconUrl={skill.iconUrl}
                                        color={skill.color}
                                    />
                                ))}
                            </Marquee>
                        )}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="max-w-6xl mx-auto px-6 mb-20">
                        <div className="flex gap-4 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-32 h-10 bg-gray-800/50 rounded-full animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Floating Tech Icons Grid */}
                {!isLoading && skillsWithIcons.length > 0 && (
                    <div className="max-w-6xl mx-auto px-6 md:px-8">
                        <motion.div
                            className="flex items-center gap-3 mb-10"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-lg">🚀</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                                Technologies I Use
                            </h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            {skillsWithIcons.map((skill, idx) => (
                                <FloatingTechIcon
                                    key={skill._id || skill.name}
                                    skill={skill}
                                    iconUrl={skill.iconUrl}
                                    color={skill.color}
                                    index={idx}
                                    total={skillsWithIcons.length}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Section */}
                {!isLoading && Skills.length > 0 && (
                    <motion.div
                        className="max-w-6xl mx-auto px-6 md:px-8 mt-24"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Technologies", value: Skills.length + "+" },
                                { label: "Years Experience", value: "1+" },
                                { label: "Projects Built", value: "20+" },
                                { label: "Lines of Code", value: "50K+" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center p-6 rounded-2xl bg-gray-800/30 border border-white/5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.1)" }}
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
});

SkillSection.displayName = "SkillSection";

export default SkillSection;
