import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Database,
  Server,
  Layout,
  GitBranch,
  Container,
  Layers,
  Cpu,
  Globe,
  Palette,
  Terminal,
  Shield,
} from "lucide-react";
import BackgroundElements from "./elements/BackgroundElements";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-6 h-6" />,
    skills: [
      { name: "React.js", level: 90, icon: <Code2 className="w-5 h-5" /> },
      { name: "Redux", level: 85, icon: <Layers className="w-5 h-5" /> },
      { name: "TypeScript", level: 88, icon: <Terminal className="w-5 h-5" /> },
      {
        name: "Tailwind CSS",
        level: 92,
        icon: <Palette className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 88, icon: <Server className="w-5 h-5" /> },
      { name: "Express.js", level: 85, icon: <Cpu className="w-5 h-5" /> },
      { name: "RESTful APIs", level: 90, icon: <Layout className="w-5 h-5" /> },
    ],
  },
  {
    title: "Database & DevOps",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "MongoDB", level: 82, icon: <Database className="w-5 h-5" /> },
      { name: "Git", level: 88, icon: <GitBranch className="w-5 h-5" /> },
      { name: "Docker", level: 75, icon: <Container className="w-5 h-5" /> },
      { name: "Security", level: 80, icon: <Shield className="w-5 h-5" /> },
    ],
  },
];

const SkillCard = ({ skill, index }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl dark:bg-white/[0.08] bg-white/[0.9] backdrop-blur-lg border border-white/10 p-4 hover:border-accent/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 dark:bg-accent/20">
                {skill.icon}
              </div>
              <h4 className="font-medium text-base dark:text-white text-gray-800">
                {skill.name}
              </h4>
            </div>
            <span className="text-sm font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              {skill.level}%
            </span>
          </div>

          <div className="relative h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="absolute h-full bg-accent rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, index }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-accent text-white relative overflow-hidden">
          {category.icon}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <h3 className="text-xl font-bold dark:text-white text-gray-800">
          {category.title}
        </h3>
      </div>

      <div className="grid gap-4">
        {category.skills.map((skill: any, idx: number) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 dark:opacity-30 opacity-10">
        <BackgroundElements className="top-20 left-20 w-72 h-72" />
        <BackgroundElements className="top-40 right-20 w-72 h-72 animation-delay-2000" />
        <BackgroundElements className="-bottom-20 left-40 w-72 h-72 animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Technical Expertise</h2>
          <p className="dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            Specialized in modern web technologies with a focus on building
            scalable and performant applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => (
            <CategorySection
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
