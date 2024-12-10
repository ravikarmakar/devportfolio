import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Tech Solutions Inc.",
    position: "Senior Full Stack Developer",
    period: "2021 - Present",
    description:
      "Led development of enterprise-level MERN stack applications, mentored junior developers, and implemented CI/CD pipelines.",
    logo: "https://images.unsplash.com/photo-1549421263-6064833b071b?w=100&h=100&fit=crop",
  },
  {
    company: "Digital Innovations",
    position: "Full Stack Developer",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple React applications, implemented RESTful APIs, and optimized database performance.",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
  },
  {
    company: "StartUp Hub",
    position: "Frontend Developer",
    period: "2018 - 2019",
    description:
      "Built responsive web applications using React and Redux, collaborated with UX designers to implement pixel-perfect designs.",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
  },
  {
    company: "StartUp Loop",
    position: "Frontend Developer",
    period: "2018 - 2019",
    description:
      "Built responsive web applications using React and Redux, collaborated with UX designers to implement pixel-perfect designs.",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Work Experience
        </motion.h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-accent/30 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card relative">
                {/* Timeline dot */}
                <div
                  className={`absolute top-6 ${
                    index % 2 === 0 ? "-left-6 md:-left-18" : "-left-6"
                  } w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg`}
                >
                  <Briefcase size={24} className="text-white" />
                </div>

                <div className="ml-8">
                  <div className="flex items-center mb-2">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-10 h-10 rounded-full mr-4 border-2 dark:border-secondary/30 border-gray-200"
                    />
                    <div>
                      <h3 className="text-xl font-semibold dark:text-textLight text-gray-900 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-accent transition-colors">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm dark:text-textLight/70 text-gray-600 mb-4 transition-colors">
                    <Calendar size={16} className="mr-2" />
                    {exp.period}
                  </div>
                  <p className="dark:text-textLight/80 text-gray-700 transition-colors">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
