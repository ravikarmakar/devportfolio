import { memo } from "react";
import { motion } from "framer-motion";

import { useAuthStore } from "../../../store/useAuthStore";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

const techBadges = [
  { tech: "React", top: "10%", left: "5%" },
  { tech: "TypeScript", top: "20%", right: "10%" },
  { tech: "Framer Motion", top: "70%", left: "15%" },
  { tech: "Tailwind CSS", top: "60%", right: "5%" },
  { tech: "Next.js", top: "40%", left: "8%" },
];

// Memoized scroll indicator
const ScrollIndicator = memo(() => (
  <motion.div
    className="absolute bottom-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
  >
    <motion.div
      className="flex flex-col items-center cursor-pointer mt-10"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <p className="mb-2 text-sm text-blue-400">Scroll Down</p>
      <svg
        className="w-6 h-6 text-blue-400"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </motion.div>
  </motion.div>
));

ScrollIndicator.displayName = "ScrollIndicator";

// Memoized floating tech badges (desktop only)
const FloatingBadges = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
    {techBadges.map((item, index) => (
      <motion.div
        key={item.tech}
        className="absolute px-3 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-500/30"
        style={{
          top: item.top,
          left: item.left,
          right: item.right,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          y: [0, -10, 0, 10, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 8 + index * 2,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut",
        }}
      >
        {item.tech}
      </motion.div>
    ))}
  </div>
));

FloatingBadges.displayName = "FloatingBadges";

// Main Hero component
const Hero = memo(() => {
  const { user } = useAuthStore();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-20 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-8 items-center">
        {/* Content Column - Takes 3/5 on large screens */}
        <HeroContent userImageUrl={user?.imageUrl} />

        {/* Visual Column - Takes 2/5 on large screens */}
        <HeroVisual />

        {/* Floating tech badges - Hidden on mobile to prevent overflow */}
        <FloatingBadges />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
