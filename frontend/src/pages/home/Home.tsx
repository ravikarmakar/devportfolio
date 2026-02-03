import { useEffect, useRef } from "react";
// import Hero from "../home/components/Hero";
// import AboutMeSection from "./components/AboutMeSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import FeaturedProjects from "../project/components/FeaturedProjects";
import SkillSection from "./components/SkillSection";
import AboutMe from "./components/AboutMe";
import ModernHeroSection from "./components/ModernHeroSection";
import { useSkillStore } from "../../store/useSkillStore";
import { useProjectStore } from "../../store/useProjectStore";

const Home = () => {
  const { fetchSkills, Skills } = useSkillStore();
  const { fetchFeaturedProjects, projects } = useProjectStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      if (Skills.length === 0) fetchSkills();
      if (projects.length === 0) fetchFeaturedProjects();
      hasFetched.current = true;
    }
  }, []);

  return (
    <>
      <ModernHeroSection />
      {/* <Hero /> */}
      <AboutMe />
      {/* <AboutMeSection /> */}
      <SkillSection />
      <FeaturedProjects />
      <EducationSection />
      <ContactSection />
    </>
  );
};

export default Home;
