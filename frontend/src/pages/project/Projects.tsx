import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useProjectStore } from "../../store/useProjectStore";
import { useEffect } from "react";
import { ProjectCard } from "./components/ProjectCard";
import ProjectCardLoadingSkeleton from "./components/ProjectCardLoadingSkeleton";

const Projects = () => {
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-flex items-center justify-center gap-2">
            {/* <BookOpen className="w-8 h-8 text-accent" /> */}
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A unique combination of formal physics education and self-taught
            programming expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <ProjectCardLoadingSkeleton index={projects.length} />
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
