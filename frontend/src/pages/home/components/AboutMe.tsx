import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Calendar, Link } from "lucide-react";

interface AboutMeProps {
  name?: string;
  title?: string;
  location?: string;
  experience?: number;
  bio?: string;
  skills?: string[];
  imageUrl?: string;
  email?: string;
  website?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  name = "Ravi Karmakar",
  title = "Product Designer & Developer",
  location = "Bengaluru, KA",
  experience = 1,
  bio = "I'm a multidisciplinary designer and developer focused on creating thoughtful digital experiences that blend form and function. With a background in both design and engineering, I bring a holistic approach to every project.",
  skills = [
    "UI/UX Design",
    "Design Systems",
    "Frontend Development",
    "React",
    "TypeScript",
    "Motion Design",
    "Figma",
    "Accessibility",
  ],
  imageUrl = "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
  email = "hello@example.com",
  website = "www.yourportfolio.com",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 });

  // Subtle scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Animation variants
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const lineReveal = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        {/* Elegant Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.p
            className="text-gray-200 uppercase tracking-widest text-sm font-medium mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            About
          </motion.p>
          <div className="relative">
            <motion.h2
              className="text-3xl md:text-4xl font-light text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              The story{" "}
              <span className="font-medium text-blue-500">behind the work</span>
            </motion.h2>
            <motion.div
              className="h-px w-16 bg-gray-900 mt-4"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            className="lg:col-span-5 relative"
            style={{ opacity, y: imageY }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              {/* Elegant frame */}
              <motion.div
                className="absolute -inset-4 border border-gray-200 rounded-sm z-0"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              />

              {/* Photo */}
              <div className="relative z-10 overflow-hidden rounded-sm bg-gray-100">
                <motion.img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-12">
            {/* Bio */}
            <motion.div
              ref={textRef}
              variants={staggerContainer}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="space-y-3">
                <motion.h3 className="text-xl md:text-2xl font-light text-gray-100">
                  <span className="font-medium">{name}</span> — {title}
                </motion.h3>

                <motion.div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-gray-300"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-200">{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar
                      size={16}
                      className="text-gray-300"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-200">
                      {experience}+ Years Experience
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <motion.p className="text-gray-400 leading-relaxed mb-4">
                  {bio}
                </motion.p>
                <motion.p className="text-gray-400 leading-relaxed">
                  My work is guided by a commitment to clarity, purpose, and
                  attention to detail. I believe that thoughtful design and
                  clean code are the foundations of exceptional digital
                  experiences.
                </motion.p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} strokeWidth={1.5} />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Link size={16} strokeWidth={1.5} />
                  <a
                    href={`https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {website}
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Elegant divider */}
            <motion.div
              className="h-px bg-gray-200 w-full"
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />

            {/* Skills */}
            <motion.div
              ref={skillsRef}
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
            >
              <motion.h4
                className="text-lg font-medium text-gray-900"
                variants={fadeIn}
              >
                Areas of Expertise
              </motion.h4>

              <motion.div className="flex flex-wrap gap-3" variants={fadeIn}>
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    custom={index}
                    variants={skillVariants}
                    className="px-4 py-2 border border-gray-200 rounded-sm text-gray-700 text-sm hover:border-gray-900 hover:bg-gray-50 cursor-default transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Elegant CTA */}
              <motion.div variants={fadeIn} className="pt-4">
                <motion.a
                  href="#work"
                  className="inline-flex items-center text-gray-200 font-medium group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>View my work</span>
                  <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
