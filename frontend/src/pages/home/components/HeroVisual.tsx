import { memo } from "react";
import { motion } from "framer-motion";
import TechIcons from "./TechIcons";

// Light rays data - defined outside component
const lightRays = [...Array(8)].map((_, i) => i);

// Memoized light ray component
const LightRay = memo<{ index: number }>(({ index }) => (
    <motion.div
        className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        style={{
            transformOrigin: "center",
            transform: `translate(-50%, -50%) rotate(${index * 45}deg)`,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
        }}
    />
));

LightRay.displayName = "LightRay";

// Diamond center component
const DiamondCenter = memo(() => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute inset-[20%] flex items-center justify-center"
    >
        <div className="relative w-full h-full">
            {/* Main Diamond */}
            <motion.div
                animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-tr from-accent via-blue-400 to-accent/50 rounded-sm transform rotate-45 shadow-lg"
                style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
            />

            {/* Inner Diamond with Glow */}
            <motion.div
                animate={{
                    rotate: [180, 0, 180],
                    scale: [0.7, 0.8, 0.7],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-[15%] bg-white dark:bg-secondary/10 rounded-sm transform rotate-45 shadow-inner"
                style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
            >
                {/* Shimmering Effect */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        background: [
                            "linear-gradient(45deg, rgba(0,188,212,0.3) 0%, rgba(238,238,238,0.7) 50%, rgba(0,188,212,0.3) 100%)",
                            "linear-gradient(45deg, rgba(238,238,238,0.7) 0%, rgba(0,188,212,0.3) 50%, rgba(238,238,238,0.7) 100%)",
                            "linear-gradient(45deg, rgba(0,188,212,0.3) 0%, rgba(238,238,238,0.7) 50%, rgba(0,188,212,0.3) 100%)",
                        ],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                />
            </motion.div>

            {/* Center Dot */}
            <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-[42%] bg-accent rounded-full shadow-md z-10"
            />

            {/* Orbiting Small Diamonds */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-0"
            >
                <motion.div
                    className="absolute w-[15%] h-[15%] bg-blue-400 rounded-sm transform rotate-45 top-0 left-[42.5%]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            <motion.div
                animate={{ rotate: -360 }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-0"
            >
                <motion.div
                    className="absolute w-[12%] h-[12%] bg-accent/80 rounded-sm transform rotate-45 bottom-0 left-[44%]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
            </motion.div>

            {/* Light Rays */}
            <div className="absolute inset-0 overflow-hidden">
                {lightRays.map((i) => (
                    <LightRay key={i} index={i} />
                ))}
            </div>
        </div>
    </motion.div>
));

DiamondCenter.displayName = "DiamondCenter";

// Main HeroVisual component
const HeroVisual = memo(() => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center"
        >
            <div className="relative w-full h-full">
                {/* 3D Layered Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Outer Circle with Gradient Border */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[90%] h-[90%] rounded-full border-[1px] border-accent/30 flex items-center justify-center"
                    />

                    {/* Middle Circle with Dash Pattern */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[70%] h-[70%] rounded-full border-[1px] border-dashed border-blue-400/40 flex items-center justify-center"
                    />

                    {/* Inner Circle with Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-[50%] h-[50%] rounded-full border-[2px] border-accent/50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-accent/5 rounded-full blur-md" />
                    </motion.div>

                    {/* Central Geometric Shape */}
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="relative w-[40%] h-[40%]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-lg transform rotate-45" />
                        <div className="absolute inset-[15%] bg-gradient-to-tr from-accent/30 to-blue-500/30 rounded-lg transform -rotate-45" />

                        <DiamondCenter />
                    </motion.div>
                </div>

                {/* Floating Tech Icons */}
                <TechIcons />
            </div>
        </motion.div>
    );
});

HeroVisual.displayName = "HeroVisual";

export default HeroVisual;
