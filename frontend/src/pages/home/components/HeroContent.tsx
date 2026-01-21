import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { GithubIcon, Linkedin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TypewriterText } from "../../../components/elements/TypeWriter";

interface HeroContentProps {
    userImageUrl?: string;
}

const HeroContent = memo<HeroContentProps>(({ userImageUrl }) => {
    const navigate = useNavigate();

    const handleContactClick = useCallback(() => {
        navigate("/contact");
    }, [navigate]);

    const handleProjectsClick = useCallback(() => {
        navigate("/projects");
    }, [navigate]);

    return (
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
                        RAVI KARMAKAR
                    </span>
                </motion.h1>

                {/* TypewriterText */}
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
                    Crafting beautiful web experiences with modern technologies.
                    Specialized in building full-stack applications with the MERN stack.
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
                            onClick={handleProjectsClick}
                        >
                            View Projects
                        </motion.button>
                        <motion.button
                            className="px-8 py-3 font-semibold text-white transition-all bg-transparent border-2 rounded-full border-blue-500 hover:bg-blue-500/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContactClick}
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
                                loading="lazy"
                                src={userImageUrl}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-md"
                            />
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
});

HeroContent.displayName = "HeroContent";

export default HeroContent;
