import { memo } from "react";
import { motion } from "framer-motion";

// Tech icons data - defined outside component to avoid recreation
const techIcons = [
    {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        alt: "React",
        position: "top-[15%] left-[10%]",
        delay: 0,
    },
    {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        alt: "Node.js",
        position: "top-[25%] right-[15%]",
        delay: 1,
    },
    {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        alt: "MongoDB",
        position: "bottom-[20%] left-[20%]",
        delay: 2,
    },
    {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        alt: "TypeScript",
        position: "bottom-[15%] right-[10%]",
        delay: 1.5,
    },
];

// Memoized single tech icon
const TechIcon = memo<{ icon: typeof techIcons[0] }>(({ icon }) => (
    <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: icon.delay,
        }}
        className={`absolute ${icon.position} w-12 h-12 bg-white dark:bg-secondary/30 rounded-lg shadow-lg flex items-center justify-center`}
    >
        <img loading="eager" src={icon.src} alt={icon.alt} className="w-8 h-8" />
    </motion.div>
));

TechIcon.displayName = "TechIcon";

// Main floating tech icons component
const TechIcons = memo(() => {
    return (
        <>
            {techIcons.map((icon) => (
                <TechIcon key={icon.alt} icon={icon} />
            ))}
        </>
    );
});

TechIcons.displayName = "TechIcons";

export default TechIcons;
