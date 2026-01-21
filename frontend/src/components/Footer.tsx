import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
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

// OPTIMIZATION: Move animation variants outside component to prevent recreation
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

// OPTIMIZATION: Calculate year once outside component
const CURRENT_YEAR = new Date().getFullYear();

// Create a motion-enabled Link component that accepts Framer Motion props
const MotionLink = motion.create(Link);

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
  // OPTIMIZATION: Memoize quick links to prevent recreation
  const quickLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  // OPTIMIZATION: Memoize social links array
  const socialLinksArray = useMemo(
    () => [
      {
        href: socialLinks.github,
        icon: Github,
        label: "GitHub",
      },
      {
        href: socialLinks.linkedin,
        icon: Linkedin,
        label: "LinkedIn",
      },
      {
        href: socialLinks.twitter,
        icon: Twitter,
        label: "Twitter",
      },
      {
        href: socialLinks.portfolio,
        icon: ExternalLink,
        label: "Portfolio",
      },
    ],
    [socialLinks]
  );

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
              {quickLinks.map((link) => {
                // Check if it's a hash link (same page navigation)
                const isHashLink = link.href.startsWith("#");

                return (
                  <motion.li key={link.href} variants={itemVariants}>
                    {isHashLink ? (
                      <motion.a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(link.href);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <MotionLink
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </MotionLink>
                    )}
                  </motion.li>
                );
              })}
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
              {socialLinksArray.map(
                (social) =>
                  social.href && (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      variants={itemVariants}
                      whileHover="hover"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  )
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
            © {CURRENT_YEAR} {name}. All rights reserved.
          </motion.p>
          <motion.p variants={itemVariants} className="mt-2 md:mt-0">
            Designed and built with ❤️
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

// OPTIMIZATION: Wrap component in memo to prevent unnecessary re-renders
export default memo(Footer);
