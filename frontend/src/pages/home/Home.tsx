import Hero from "../home/components/Hero";
import AboutMeSection from "./components/AboutMeSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import FeaturedProjects from "../project/components/FeaturedProjects";
import SkillSection from "./components/SkillSection";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutMeSection />
      <SkillSection />
      <FeaturedProjects />
      <EducationSection />
      <ContactSection />
    </>
  );
};

export default Home;
