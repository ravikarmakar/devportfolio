import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Twitter, ExternalLink, Github } from "lucide-react";

interface FooterProps {
  name?: string;
  email?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

const Footer: React.FC<FooterProps> = ({
  name = "Ravi Karmakar",
  email = "ravikarmkar94475@gmail.com",
  socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    portfolio: "https://yourportfolio.com",
  },
}) => {
  const currentYear = new Date().getFullYear();

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="w-full text-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3
              className="text-2xl font-bold text-white"
              variants={itemVariants}
            >
              {name}
            </motion.h3>
            <motion.p
              className="text-gray-400 text-sm max-w-xs"
              variants={itemVariants}
            >
              Creating digital experiences with a focus on clean design and
              intuitive user interfaces.
            </motion.p>
          </motion.div>

          {/* Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              variants={itemVariants}
            >
              Quick Links
            </motion.h4>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants}>
                <motion.a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Home
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a
                  href="#projects"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Projects
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  About
                </motion.a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              variants={itemVariants}
            >
              Contact
            </motion.h4>
            <motion.div className="space-y-2" variants={containerVariants}>
              <motion.p
                className="text-gray-400 flex items-center gap-2"
                variants={itemVariants}
              >
                <Mail size={16} />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {email}
                </a>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Social Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              variants={itemVariants}
            >
              Connect
            </motion.h4>
            <motion.div className="flex gap-4" variants={containerVariants}>
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  variants={itemVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Github size={20} />
                </motion.a>
              )}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  variants={itemVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
              {socialLinks.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  variants={itemVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Twitter size={20} />
                </motion.a>
              )}
              {socialLinks.portfolio && (
                <motion.a
                  href={socialLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                  variants={itemVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <ExternalLink size={20} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gray-700 my-8"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
          variants={containerVariants}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={itemVariants}>
            © {currentYear} {name}. All rights reserved.
          </motion.p>
          <motion.p variants={itemVariants} className="mt-2 md:mt-0">
            Designed and built with ❤️
          </motion.p>
        </motion.div>
      </div>

      {/* <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        className="p-2 ml-10 bg-accent rounded-full text-white hover:bg-accent/90 transition-colors"
      >
        <ArrowUp size={24} />
      </motion.button> */}
    </footer>
  );
};

export default Footer;
