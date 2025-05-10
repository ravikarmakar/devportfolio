import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Code2, Mail, Github, Linkedin } from "lucide-react";

const ComingSoon = () => {
  // Colors - matching the loading screen
  const colors = {
    primary: "#2563eb", // Medium blue
    secondary: "#1d4ed8", // Darker blue
    accent: "#60a5fa", // Lighter blue
    highlight: "#93c5fd", // Very light blue
  };

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update countdown timer
  useEffect(() => {
    // Set launch date - 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Particle animation for background
  const particles = Array.from({ length: 20 }).map((_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 max-w-2xl mx-4 text-center">
        {/* Logo and branding */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="relative flex items-center justify-center w-16 h-16 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0px ${colors.primary}`,
                  `0 0 20px ${colors.primary}`,
                  `0 0 0px ${colors.primary}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <Code2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-blue-400">Portfolio</span> Coming Soon
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg text-blue-100 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          I'm working on something awesome. Stay tuned!
        </motion.p>

        {/* Countdown timer */}
        <motion.div
          className="grid grid-cols-4 gap-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <motion.div
                className="text-2xl md:text-3xl font-bold text-white bg-blue-800 bg-opacity-30 rounded-lg py-3 px-2"
                animate={{
                  scale: item.value === 0 ? [1, 1.05, 1] : 1,
                  backgroundColor:
                    item.value === 0
                      ? colors.primary
                      : "rgba(30, 64, 175, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                {String(item.value).padStart(2, "0")}
              </motion.div>
              <p className="text-sm mt-1 text-blue-200">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: <Mail size={20} />, label: "Email" },
            { icon: <Github size={20} />, label: "GitHub" },
            { icon: <Linkedin size={20} />, label: "LinkedIn" },
          ].map((item) => (
            <motion.a
              key={item.label}
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full text-white"
              style={{ backgroundColor: colors.secondary }}
              whileHover={{
                scale: 1.1,
                backgroundColor: colors.primary,
                boxShadow: `0 0 15px ${colors.accent}`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ComingSoon;
