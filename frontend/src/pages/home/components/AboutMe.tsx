import { memo, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Sparkles } from "lucide-react";

import { useAuthStore } from "../../../store/useAuthStore";
import { useSkillStore } from "../../../store/useSkillStore";

// Animation variants - defined outside component
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const AboutMe = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const { user } = useAuthStore();
  const { Skills, fetchSkills } = useSkillStore();

  useEffect(() => {
    if (Skills.length === 0) {
      fetchSkills();
    }
  }, [Skills.length, fetchSkills]);

  const displaySkills = useMemo(() => {
    return Array.from(new Set(Skills.map((s) => s.name))).slice(0, 8);
  }, [Skills]);

  // Fallback values if user data not loaded
  const name = user?.username || "Ravi Karmakar";
  const title = user?.techRole || "Full Stack Developer";
  const location = user?.location || "Bengaluru, KA";
  const experience = user?.experience || 1;
  const bio =
    user?.bio ||
    "I'm a passionate developer focused on creating thoughtful digital experiences that blend form and function.";
  const imageUrl =
    user?.imageUrl ||
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-white">The story </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              behind the work
            </span>
          </motion.h2>
        </motion.div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Image Column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10">
                <motion.img
                  src={imageUrl}
                  alt={name}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
                  whileHover={{ scale: 1.02 }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                {/* Name badge on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
                  <p className="text-blue-400 font-medium">{title}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Info badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-white/10 text-gray-300">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-white/10 text-gray-300">
                <Calendar size={16} className="text-blue-400" />
                <span className="text-sm">{experience}+ Years Experience</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">{bio}</p>
              <p className="text-gray-400 leading-relaxed">
                My work is guided by a commitment to clarity, purpose, and
                attention to detail. I believe that thoughtful design and clean
                code are the foundations of exceptional digital experiences.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={fadeInUp}
              className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            {/* Skills - Dynamic from store */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-blue-400" />
                Areas of Expertise
              </h4>

              <div className="flex flex-wrap gap-2">
                {displaySkills.length > 0
                  ? displaySkills.map((skillName, index) => (
                    <motion.span
                      key={skillName}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.4,
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-800/50 border border-white/10 text-gray-300 text-sm hover:border-blue-500/50 hover:text-blue-400 cursor-default transition-colors duration-300"
                    >
                      {skillName}
                    </motion.span>
                  ))
                  : // Fallback skeleton if skills not loaded
                  [...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-gray-800/30 border border-white/5 text-transparent animate-pulse"
                    >
                      Loading...
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all group shadow-lg shadow-blue-500/25"
              >
                <span>View My Work</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
