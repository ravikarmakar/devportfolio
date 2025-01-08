import { motion } from "framer-motion";
import { User } from "../../../types";
import DynamicIcon from "../../../components/icon/IconImport";

interface ProfileAboutProps {
  user: User | null; // null agar user data abhi fetch nahi hua
}

const AboutSection: React.FC<ProfileAboutProps> = ({ user }) => {
  const stats = [
    { icon: "BookOpen", label: "Years Experience", value: "1+" },
    { icon: "Award", label: "Projects Completed", value: "10+" },
    { icon: "Coffee", label: "Cups of Coffee", value: "500+" },
    { icon: "Heart", label: "Happy Clients", value: "5+" },
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
          {user?.aboutMe}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
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
                    <DynamicIcon
                      size={24}
                      iconName={stat.icon}
                      className="w-6 h-6 text-accent"
                    />
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
