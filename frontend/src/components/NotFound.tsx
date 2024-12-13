import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import FloatingParticles from "./elements/FloatingParticles";

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={20} />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center"
      >
        <motion.div animate={floatingAnimation} className="mb-8 inline-block">
          <motion.div animate={glowAnimation} className="relative">
            <AlertCircle className="w-24 h-24 text-accent mx-auto" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl -z-10" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-accent to-purple-500 text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Oops! Looks like you've ventured into unknown territory.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Return Home</span>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;
