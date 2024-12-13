import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  BookOpen,
  Code2,
  Brain,
  Atom,
  Calculator,
  Database,
  Globe,
  Server,
  Layout,
  Terminal,
  Lightbulb,
  Award,
  Target,
} from "lucide-react";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formalEducation = {
    degree: "B.Sc. Physics (Honors)",
    period: "2020 - 2023",
    institution: "B.S.K College, Barharwa",
    description:
      "Pursued a comprehensive degree in Physics, developing strong analytical and problem-solving abilities through the study of advanced physical concepts and mathematical analysis.",
    keyAchievements: [
      "Specialized in Quantum Mechanics and Mathematical Physics",
      "Conducted research projects in theoretical physics",
      "Participated in physics seminars and workshops",
      "Developed strong analytical and mathematical skills",
    ],
    skills: [
      { name: "Analytical Thinking", icon: Brain },
      { name: "Mathematical Analysis", icon: Calculator },
      { name: "Quantum Physics", icon: Atom },
      { name: "Research Methods", icon: Lightbulb },
    ],
  };

  const selfTaughtJourney = {
    title: "Self-taught Full-Stack Developer",
    period: "2022 - Present",
    description:
      "Embarked on a comprehensive self-learning journey in web development, mastering modern technologies and best practices through hands-on projects and continuous learning.",
    milestones: [
      {
        year: "End of 2023",
        achievements: [
          "Started with HTML, CSS, and JavaScript fundamentals",
          "Built responsive websites and basic web applications",
          "Learned version control with Git and GitHub",
        ],
      },
      {
        year: "Mid of 2024",
        achievements: [
          "Mastered React.js and modern frontend development",
          "Learned Node.js and Express.js for backend development",
          "Started working with databases and API development",
        ],
      },
      {
        year: "2024 - Present",
        achievements: [
          "Advanced full-stack development with MERN stack",
          "Cloud deployment and DevOps practices",
        ],
      },
    ],
    techStack: [
      { name: "Frontend Development", icon: Layout },
      { name: "Backend Development", icon: Server },
      { name: "Database Management", icon: Database },
      { name: "API Development", icon: Globe },
      { name: "DevOps & Deployment", icon: Terminal },
    ],
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-flex items-center justify-center gap-2">
            {/* <BookOpen className="w-8 h-8 text-accent" /> */}
            Educational Backgrounddd
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A unique combination of formal physics education and self-taught
            programming expertise, bringing analytical thinking and technical
            skills together.
          </p>
        </motion.div>

        {/* Formal Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-accent text-white">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold dark:text-white">
                  {formalEducation.degree}
                </h3>
                <p className="text-accent">
                  {formalEducation.period} • {formalEducation.institution}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {formalEducation.description}
            </p>

            {/* Key Achievements */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Key Achievements
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {formalEducation.keyAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-accent/5 dark:bg-accent/10 p-4 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Gained */}
            <div>
              <h4 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Skills Gained
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formalEducation.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-4 bg-accent/5 dark:bg-accent/10 rounded-xl text-center"
                    >
                      <Icon className="w-6 h-6 text-accent" />
                      <span className="text-sm font-medium dark:text-gray-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Self-Taught Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-accent text-white">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold dark:text-white">
                  {selfTaughtJourney.title}
                </h3>
                <p className="text-accent">{selfTaughtJourney.period}</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {selfTaughtJourney.description}
            </p>

            {/* Learning Timeline */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Learning Timeline
              </h4>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30" />
                {selfTaughtJourney.milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative pl-12 pb-8 last:pb-0"
                  >
                    <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-accent transform -translate-x-1/2" />
                    <div className="bg-accent/5 dark:bg-accent/10 p-6 rounded-xl">
                      <h5 className="text-lg font-semibold dark:text-white mb-3">
                        {milestone.year}
                      </h5>
                      <ul className="space-y-2">
                        {milestone.achievements.map((achievement, i) => (
                          <motion.li
                            key={achievement}
                            initial={{ opacity: 0, x: -10 }}
                            animate={
                              inView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -10 }
                            }
                            transition={{
                              duration: 0.3,
                              delay: index * 0.2 + i * 0.1,
                            }}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" />
                Technology Stack
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {selfTaughtJourney.techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        inView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-4 bg-accent/5 dark:bg-accent/10 rounded-xl text-center hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-accent" />
                      <span className="text-sm font-medium dark:text-gray-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-40 w-72 h-72 bg-green-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
    </section>
  );
};

export default Education;
