import { motion } from "framer-motion";

const FloatingParticles = ({ count }: { count: number }) => (
  <div className="absolute inset-0">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-accent/50 rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: Math.random() * 300 - 100,
          y: Math.random() * 200 - 100,
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
        style={{
          left: `${50 + Math.random() * 20}%`,
          top: `${50 + Math.random() * 20}%`,
        }}
      />
    ))}
  </div>
);

export default FloatingParticles;
