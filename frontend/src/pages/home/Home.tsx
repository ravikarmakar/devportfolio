import Hero from "../home/components/Hero";
import AboutMeSection from "./components/AboutMeSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ProjectSection from "./components/ProjectSection";
import SkillSection from "./components/SkillSection";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutMeSection />
      <SkillSection />
      <ProjectSection />
      <EducationSection />
      <ContactSection />
    </>
  );
};

export default Home;
