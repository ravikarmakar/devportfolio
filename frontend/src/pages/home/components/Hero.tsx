import { motion } from "framer-motion";
import { GithubIcon, Linkedin } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore";
import LoadingSkeleton from "./LoadingSkeleton";
import { Link } from "react-router-dom";
import { TypewriterText } from "../../../components/elements/TypeWriter";

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
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-20 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-8 items-center">
        {/* Content Column - Takes 3/5 on large screens */}
        <motion.div
          className="lg:col-span-3 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            {/* Role Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-400/10 dark:bg-blue-800/30 border border-blue-500/20 text-blue-600 dark:text-blue-300 font-medium text-sm"
            >
              Full Stack Developer
            </motion.div>

            {/* Name intro */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xs md:text-lg font-semibold tracking-widest text-blue-400 uppercase"
            >
              Hello, I'm
            </motion.div>

            {/* Main name */}
            <motion.h1
              className="mb-6 text-4xl font-bold text-white md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <span className="font-extrabold bg-clip-text uppercase text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {user?.name || "RAVI KARMAKAR"}
              </span>
            </motion.h1>

            <div className="text-xl md:text-2xl font-bold text-gray-700 dark:text-textLight/80">
              I'm a{" "}
              <span className="text-accent inline">
                <TypewriterText
                  texts={[
                    "Frontend Developer",
                    "UI/UX Designer",
                    "Creative Thinker",
                  ]}
                />
              </span>
            </div>

            <p className="dark:text-textLight/70 text-gray-600 text-lg leading-relaxed">
              {user?.bio ||
                "Passionate about creating elegant, efficient, and user-friendly web applications that solve real-world problems."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.button
                  className="px-8 py-3 font-semibold text-white transition-all border-2 rounded-full border-blue-500 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
                <motion.button
                  className="px-8 py-3 font-semibold text-white transition-all bg-transparent border-2 rounded-full border-blue-500 hover:bg-blue-500/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
              <motion.a
                href="https://github.com/ravikarmakar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 dark:bg-blue-800/20 bg-gray-100 rounded-full dark:text-blue-400 text-primary hover:bg-gray-200 dark:hover:bg-blue-800/30 transition-colors shadow-md"
              >
                <GithubIcon size={22} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 dark:bg-blue-800/20 bg-gray-100 rounded-full dark:text-blue-400 text-primary hover:bg-gray-200 dark:hover:bg-blue-800/30 transition-colors shadow-md"
              >
                <Linkedin size={22} />
              </motion.a>

              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="relative group cursor-pointer md:hidden"
                >
                  <img
                    src={user?.profileImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-md"
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Visual Column - Takes 2/5 on large screens */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-lg transform rotate-45 backdrop-blur-sm" />
                <div className="absolute inset-[15%] bg-gradient-to-tr from-accent/30 to-blue-500/30 rounded-lg transform -rotate-45 backdrop-blur-sm" />

                {/* Diamond Design in Center */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute inset-[20%] flex items-center justify-center"
                >
                  {/* Diamond Shape */}
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
                      className="absolute inset-[15%] bg-white dark:bg-secondary/10 backdrop-blur-md rounded-sm transform rotate-45 shadow-inner"
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
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                          style={{
                            transformOrigin: "center",
                            transform: `translate(-50%, -50%) rotate(${
                              i * 45
                            }deg)`,
                          }}
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Tech Icons */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[10%] w-12 h-12 bg-white dark:bg-secondary/30 rounded-lg shadow-lg flex items-center justify-center"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
                className="w-8 h-8"
              />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-[25%] right-[15%] w-12 h-12 bg-white dark:bg-secondary/30 rounded-lg shadow-lg flex items-center justify-center"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
                className="w-8 h-8"
              />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[20%] left-[20%] w-12 h-12 bg-white dark:bg-secondary/30 rounded-lg shadow-lg flex items-center justify-center"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                alt="MongoDB"
                className="w-8 h-8"
              />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-[15%] right-[10%] w-12 h-12 bg-white dark:bg-secondary/30 rounded-lg shadow-lg flex items-center justify-center"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                alt="TypeScript"
                className="w-8 h-8"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating tech badges */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            "React",
            "TypeScript",
            "Framer Motion",
            "Tailwind CSS",
            "Next.js",
          ].map((tech, index) => (
            <motion.div
              key={tech}
              className="absolute px-3 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-500/30"
              initial={{
                x: Math.random() * window.innerWidth * 0.8,
                y: Math.random() * window.innerHeight * 0.8,
                opacity: 0,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth * 0.8,
                  Math.random() * window.innerWidth * 0.8,
                  Math.random() * window.innerWidth * 0.8,
                ],
                y: [
                  Math.random() * window.innerHeight * 0.8,
                  Math.random() * window.innerHeight * 0.8,
                  Math.random() * window.innerHeight * 0.8,
                ],
                opacity: 0.7,
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                delay: index * 2,
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
};

export default Hero;
