import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code, User, Calendar, MapPin, Award } from "lucide-react";

interface AboutMeProps {
  name?: string;
  title?: string;
  location?: string;
  experience?: number;
  bio?: string;
  skills?: string[];
  interests?: string[];
  imageUrl?: string;
}

const AboutMeSection: React.FC<AboutMeProps> = ({
  name = "Ravi Karmakar",
  title = "Full Stack Developer",
  location = "Bengaluru, KA",
  experience = 1,
  bio = "Passionate frontend developer with a strong focus on creating intuitive, accessible, and beautiful user interfaces. I combine technical expertise with creative problem-solving to build exceptional digital experiences.",
  skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Framer Motion",
    "Tailwind CSS",
    "UI/UX Design",
    "Responsive Design",
    "Accessibility",
  ],
  interests = [
    "Web Animation",
    "Design Systems",
    "Open Source",
    "Creative Coding",
  ],
  imageUrl = "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740",
}) => {
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const bioInView = useInView(bioRef, { once: true, amount: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 });

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Stagger animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for elegant motion
      },
    },
  };

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
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
    hover: {
      scale: 1.05,
      backgroundColor: "#2563EB",
      color: "#ffffff",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="relative py-24 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "30px 30px",
          y: backgroundY,
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About{" "}
            <span className="text-blue-600 relative">
              Me
              {/* <motion.span
                className="absolute bottom-0 left-0 h-2 bg-blue-400 w-full rounded-md -z-10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              /> */}
            </span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.p
            className="text-gray-200 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Get to know more about me, my background, and what drives my passion
            for development.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <motion.div
                className="absolute -left-6 -top-6 w-full h-full border-2 border-blue-500 rounded-md z-0"
                animate={{
                  left: ["-1.5rem", "-1rem", "-1.5rem"],
                  top: ["-1.5rem", "-1rem", "-1.5rem"],
                  rotate: [0, 2, 0],
                  transition: {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
              <motion.div
                className="rounded-md overflow-hidden relative z-10 bg-white shadow-xl"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-auto max-w-md object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.h3
                      className="text-white text-2xl font-bold"
                      variants={textRevealVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {name}
                    </motion.h3>
                    <motion.p
                      className="text-blue-200 text-lg"
                      variants={textRevealVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {title}
                    </motion.p>
                  </motion.div>
                </div>
                <motion.div
                  className="bg-blue-700 p-4 flex justify-around"
                  variants={iconContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      icon: <Calendar size={18} />,
                      text: `${experience}+ Yrs Exp`,
                    },
                    { icon: <MapPin size={18} />, text: location },
                    { icon: <Award size={18} />, text: "Award Winner" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-sm text-gray-600"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <div className="bg-blue-100 rounded-full p-2 mb-1 text-blue-600">
                        {item.icon}
                      </div>
                      <span className="text-white">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="space-y-10">
            {/* Bio Section */}
            <motion.div
              ref={bioRef}
              variants={containerVariants}
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <motion.h3
                className="text-2xl font-bold text-gray-200 flex items-center gap-2"
                variants={itemVariants}
              >
                <User className="text-blue-500" size={24} />
                Biography
              </motion.h3>
              <motion.p
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                {bio}
              </motion.p>
              <motion.p
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                I believe in crafting digital experiences that are not just
                functional, but also beautiful and intuitive. My goal is to
                blend technical excellence with creative design to build
                solutions that truly resonate with users.
              </motion.p>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              ref={skillsRef}
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
            >
              <motion.h3
                className="text-2xl font-bold text-gray-200 flex items-center gap-2"
                variants={itemVariants}
              >
                <Code className="text-blue-500" size={24} />
                Skills & Interests
              </motion.h3>

              <motion.div variants={containerVariants} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <h4 className="text-lg font-medium text-gray-300 mb-3">
                    Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        custom={index}
                        variants={skillVariants}
                        initial="hidden"
                        animate={skillsInView ? "visible" : "hidden"}
                        whileHover="hover"
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h4 className="text-lg font-medium text-gray-300 mb-3">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <motion.span
                        key={interest}
                        custom={index + skills.length}
                        variants={skillVariants}
                        initial="hidden"
                        animate={skillsInView ? "visible" : "hidden"}
                        whileHover="hover"
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8"
            >
              <motion.a
                href="#contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#1d4ed8",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </motion.div> */}
            <motion.div variants={fadeIn} className="pt-4">
              <motion.a
                href="#work"
                className="inline-flex items-center text-gray-200 hover:text-blue-400 font-medium group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span>View my work</span>
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMeSection;
