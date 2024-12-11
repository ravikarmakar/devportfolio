import { motion } from "framer-motion";
import { GraduationCap, Code2, BookOpen } from "lucide-react";

const EducationSection = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        {/* <div className="p-2 bg-accent/10 rounded-lg">
          <BookOpen className="w-6 h-6 text-accent" />
        </div> */}
        <h2 className="text-2xl font-bold dark:text-white">Education</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formal Education */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-secondary/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <GraduationCap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white">
                B.Sc. Physics (Honors)
              </h3>
              <p className="text-sm text-accent">2020 - 2023</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Specialized in Theoretical Physics</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Research in Quantum Mechanics</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Strong Mathematical Foundation</span>
            </li>
          </ul>
        </motion.div>

        {/* Self-Taught Journey */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-secondary/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Code2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white">
                Self-Taught Developer
              </h3>
              <p className="text-sm text-accent">2023 - 2024 - Present</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Full Stack Development (MERN)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Modern Frontend Technologies</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span>Backend & API Development</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationSection;
