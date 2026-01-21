// import Hero from "../home/components/Hero";
// import AboutMeSection from "./components/AboutMeSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import FeaturedProjects from "../project/components/FeaturedProjects";
import SkillSection from "./components/SkillSection";
import AboutMe from "./components/AboutMe";
import ModernHeroSection from "./components/ModernHeroSection";

const Home = () => {
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
