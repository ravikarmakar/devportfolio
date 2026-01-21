import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface GlowingParticlesProps {
    scrolled: boolean;
}

interface ParticleConfig {
    initialLeft: number;
    animateLeft: number;
    delay: number;
}

const GlowingParticles = memo(({ scrolled }: GlowingParticlesProps) => {
    // CRITICAL FIX: Memoize particle configurations to prevent infinite re-renders
    // Math.random() is only called once, not on every render
    const particleConfigs = useMemo<ParticleConfig[]>(
        () =>
            [...Array(5)].map((_, i) => ({
                initialLeft: Math.random() * 100,
                animateLeft: Math.random() * 100,
                delay: i * 0.4,
            })),
        [] // Empty dependency array = calculate only once
    );

    return (
        <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
            <div className="relative w-full h-full">
                {scrolled &&
                    particleConfigs.map((config, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full"
                            initial={{
                                left: `${config.initialLeft}%`,
                                opacity: 0,
                            }}
                            animate={{
                                left: `${config.animateLeft}%`,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: config.delay,
                                repeatType: "loop",
                            }}
                        />
                    ))}
            </div>
        </div>
    );
});

GlowingParticles.displayName = "GlowingParticles";

export default GlowingParticles;
