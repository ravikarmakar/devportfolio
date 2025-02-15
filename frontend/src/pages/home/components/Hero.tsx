import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { GithubIcon, Linkedin, Download } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore";
import FloatingParticles from "../../../components/elements/FloatingParticles";
import LoadingSkeleton from "./LoadingSkeleton";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user, fetchUserData, isLoading } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-6 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-roboto mb-4 dark:text-textLight text-gray-900">
            Hi, I'm <br />
            <span className="text-accent">{user?.name || "Ravi Karmakar"}</span>
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

              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={user?.profileImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-accent object-cover md:hidden"
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[500px] flex items-center justify-center overflow-hidden md:h-[600px]"
        >
          {/* Background Gradient Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse animation-delay-2000" />
          </div>

          {/* Original Geometric Shapes */}
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

          {/* Extra Geometric Shape with Glow Effect */}
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-[3px] border-blue-400/30 rounded-full transform rotate-45 blur-lg animate-pulse" />
              <div className="absolute inset-0 border-[2px] border-pink-400/50 rounded-lg transform -rotate-45 animate-pulse" />
              {/* <div className="absolute inset-[20%] bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 rounded-full blur-lg animate-spin-slow" /> */}
            </div>
          </motion.div>

          {/* New Triangle Shape with Continuous Rotation */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Triangle Shape */}
            <div className="relative w-40 h-40">
              <div
                className="absolute inset-0 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent 
        border-b-[70px] border-b-blue-400 transform rotate-60 blur-md shadow-lg"
              />
              <div
                className="absolute inset-0 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent 
        border-b-[70px] border-b-pink-400 transform -rotate-60 blur-md shadow-lg animate-pulse"
              />
            </div>
          </motion.div>

          {/* Floating Particles */}
          <FloatingParticles count={30} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
