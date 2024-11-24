import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { GithubIcon, Linkedin, Download } from "lucide-react";
import { useEffect } from "react";
import useUserStore from "../../../store/useUserStore";

const Hero = () => {
  const { user, fetchUserData } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4 dark:text-textLight text-gray-900">
            Hi, I'm <br />
            <span className="text-accent">{user?.name}</span>
          </h1>
          <div className="text-xl md:text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600 font-bold gradient-text">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "MERN Stack Expert",
                2000,
                "UI/UX Enthusiast",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <p className="dark:text-textLight/70 text-gray-600 mb-8 text-lg">
            {user?.bio}
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </motion.button>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/ravikarmakar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 dark:bg-secondary/20 bg-gray-100 rounded-full dark:text-accent text-primary hover:bg-gray-200 dark:hover:bg-secondary/30 transition-colors"
              >
                <GithubIcon size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 dark:bg-secondary/20 bg-gray-100 rounded-full dark:text-accent text-primary hover:bg-gray-200 dark:hover:bg-secondary/30 transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[400px] flex items-center justify-center"
        >
          {/* Background Gradient Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse animation-delay-2000" />
          </div>

          {/* Geometric Shapes */}
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
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-2 border-accent/30 rounded-lg transform rotate-45" />
              <div className="absolute inset-0 border-2 border-accent/20 rounded-lg transform -rotate-45 animate-pulse" />
              <div className="absolute inset-[25%] border-2 border-accent/40 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
