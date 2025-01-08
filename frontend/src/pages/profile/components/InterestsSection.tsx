import { motion } from "framer-motion";
import { Code, Music, Camera, Book, Plane, Gamepad } from "lucide-react";

const InterestsSection = () => {
  const interests = [
    { icon: Code, label: "Coding", color: "text-blue-500" },
    { icon: Music, label: "Music", color: "text-purple-500" },
    { icon: Camera, label: "Photography", color: "text-pink-500" },
    { icon: Book, label: "Reading", color: "text-green-500" },
    { icon: Plane, label: "Travel", color: "text-yellow-500" },
    { icon: Gamepad, label: "Gaming", color: "text-red-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Interests & Hobbies
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {interests.map((interest, index) => {
          const Icon = interest.icon;
          return (
            <motion.div
              key={interest.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-secondary/20 rounded-xl p-4 text-center hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-2 flex justify-center">
                <Icon className={`w-8 h-8 ${interest.color}`} />
              </div>
              <div className="text-sm font-medium dark:text-gray-300">
                {interest.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InterestsSection;
