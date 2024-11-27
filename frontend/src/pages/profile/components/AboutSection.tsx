import { motion } from "framer-motion";
import { BookOpen, Award, Coffee, Heart } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: BookOpen, label: "Years Experience", value: "4+" },
    { icon: Award, label: "Projects Completed", value: "50+" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
    { icon: Heart, label: "Happy Clients", value: "30+" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">About Me</h2>
      <div className="bg-white dark:bg-secondary/20 rounded-xl p-6 backdrop-blur-sm">
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Passionate full-stack developer with expertise in building modern web
          applications. I specialize in React, Node.js, and cloud technologies.
          When I'm not coding, you'll find me exploring new technologies,
          contributing to open-source projects, or sharing knowledge through
          technical writing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 flex justify-center">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="font-bold text-2xl dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;