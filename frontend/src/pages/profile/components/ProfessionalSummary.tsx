import { motion } from "framer-motion";
import { Code2, Server, Database, Rocket } from "lucide-react";
import { User } from "../../../types";

interface ProfileSummaryrProps {
  user: User | null; // null agar user data abhi fetch nahi hua
}

const ProfessionalSummary: React.FC<ProfileSummaryrProps> = ({ user }) => {
  const summaryPoints = [
    {
      icon: <Code2 className="w-6 h-6 text-accent" />,
      title: "Frontend Development",
      description:
        "Expert in React.js, TypeScript, and modern frontend frameworks with a focus on building responsive and performant web applications.",
    },
    {
      icon: <Server className="w-6 h-6 text-accent" />,
      title: "Backend Development",
      description:
        "Proficient in Node.js and Express.js, creating scalable server-side solutions and RESTful APIs.",
    },
    {
      icon: <Database className="w-6 h-6 text-accent" />,
      title: "Database Management",
      description:
        "Experience with MongoDB, MySQL, and database optimization techniques for efficient data management.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-accent" />,
      title: "DevOps & Deployment",
      description:
        "Skilled in CI/CD pipelines, Docker containerization, and cloud deployment using AWS and other platforms.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Professional Summary
      </h2>
      <div className="bg-white dark:bg-secondary/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {user?.profileSummery}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summaryPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-lg hover:bg-accent/5 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <div className="p-2 bg-accent/10 rounded-lg">{point.icon}</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessionalSummary;
