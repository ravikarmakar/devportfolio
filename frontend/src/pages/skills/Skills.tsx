import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BackgroundElements from "../../components/elements/BackgroundElements";
import { useSkillStore } from "../../store/useSkillStore";
import { useEffect } from "react";
import { CategorySection } from "./components/CategorySection";
// import { CategorySectionsSkeleton } from "./components/CategorySectionsSkeleton";

const Skills = () => {
  const { fetchCategories, Categories } = useSkillStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
          {/* <TitleWithAnimation text="Technical Expertise" /> */}

          <p className="dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            Specialized in modern web technologies with a focus on building
            scalable and performant applications
          </p>
          {/* <div className="inline-flex items-center mt-4 gap-2 text-accent group-hover:gap-4 transition-all">
            Skills <ArrowRight size={20} />
          </div> */}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Categories.map((category, index) => (
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
