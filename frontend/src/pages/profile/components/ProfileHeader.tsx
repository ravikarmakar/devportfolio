import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { User } from "../../../types";
import { Link } from "react-router-dom";
import {
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  Sparkles,
  ShieldOff,
} from "lucide-react";
import { DownloadButton } from "../../../components/ReasumeButton";

interface ProfileHeaderProps {
  user: User | null; // null agar user data abhi fetch nahi hua
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Available for Hire</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-textLight text-gray-900">
            here,<span className="text-accent block mt-2">{user?.name}</span>
          </h1>

          <div className="text-xl md:text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 font-bold h-[40px]">
            <TypeAnimation
              sequence={[
                "Backend Developer",
                2000,

                "Frontend Developer",
                2000,
                "Full Stack Developer",
                2000,
                "Mern Stack Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-lg">
            Transforming ideas into exceptional web experiences. Let's create
            something amazing together.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              Hire Me
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(user?.resumeUrl, "_blank")}
              className="px-6 py-3 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.button> */}
            <DownloadButton user={user} />
          </div>

          <div className="mt-8 flex gap-4">
            <motion.a
              href="mailto:ravikarmkar94475@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <Mail size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/ravikarmakar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ravikarmakar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <Link to="/login" rel="noopener noreferrer">
                <ShieldOff size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content - Profile Image with Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[400px] flex items-center justify-center order-first md:order-last"
        >
          {/* Background Gradient Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse animation-delay-2000" />
          </div>

          {/* Profile Image Container */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative z-10"
          >
            <div className="relative w-64 h-64">
              <img
                src={user?.profileImageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-accent shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-bgDark"></div>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute inset-0 border-2 border-accent/30 rounded-full animate-spin-slow"
              style={{ animationDuration: "15s" }}
            />
            <div
              className="absolute inset-0 border-2 border-accent/20 rounded-full animate-spin-slow"
              style={{ animationDuration: "10s" }}
            />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/50 rounded-full"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.random() * 200 - 100,
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
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileHeader;
