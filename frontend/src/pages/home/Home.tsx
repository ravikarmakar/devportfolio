import Hero from "../home/components/Hero";
import AboutMeSection from "./components/AboutMeSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import Projects from "./components/Projects";
import SkillSection from "./components/SkillSection";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutMeSection />
      <SkillSection />
      <Projects />
      <EducationSection />
      <ContactSection />
    </>
  );
};

export default Home;
