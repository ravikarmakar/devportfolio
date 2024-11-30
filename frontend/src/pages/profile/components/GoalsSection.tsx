import { motion } from "framer-motion";
import {
  Target,
  Rocket,
  Trophy,
  Lightbulb,
  Compass,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

const GoalsSection = () => {
  const goals = [
    {
      icon: Target,
      title: "Short Term Goals",
      items: [
        "Master Advanced React Patterns and Performance Optimization",
        "Contribute to Major Open Source Projects",
        "Build a SaaS Product from Scratch",
      ],
    },
    {
      icon: Rocket,
      title: "Long Term Vision",
      items: [
        "Become a Technical Architect",
        "Launch a Successful Tech Startup",
        "Mentor Next Generation Developers",
      ],
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      label: "Technical Excellence",
      description: "Striving for mastery in full-stack development",
    },
    {
      icon: Lightbulb,
      label: "Innovation",
      description: "Creating unique solutions to complex problems",
    },
    {
      icon: Compass,
      label: "Leadership",
      description: "Guiding teams to achieve exceptional results",
    },
    {
      icon: Star,
      label: "Impact",
      description: "Making a difference in the tech community",
    },
  ];

  const futureProjects = [
    {
      icon: TrendingUp,
      title: "AI-Powered Code Assistant",
      description:
        "Developing an intelligent coding companion using machine learning",
    },
    {
      icon: Users,
      title: "Developer Community Platform",
      description: "Building a platform to connect and empower developers",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Goals & Vision
      </h2>

      {/* Main Goals Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          return (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-secondary/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">
                  {goal.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {goal.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + itemIndex * 0.1,
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Core Values/Achievements */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 dark:text-white">
          Core Values & Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-secondary/20 rounded-xl p-4 text-center hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  {achievement.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Future Projects */}
      <div>
        <h3 className="text-xl font-semibold mb-6 dark:text-white">
          Future Projects
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {futureProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-secondary/20 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold dark:text-white">
                    {project.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>
    </motion.div>
  );
};

export default GoalsSection;
