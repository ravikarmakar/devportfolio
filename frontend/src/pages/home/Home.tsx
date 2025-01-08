import Contact from "../../components/Contact";
import Education from "../education/Education";
// import Experience from "../experience/Experience";
import Hero from "../home/components/Hero";
import Projects from "../project/Projects";
import Skills from "../skills/Skills";

const Home = () => {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      {/* <Experience /> */}
      <Education />
      <Contact />
    </>
  );
};

export default Home;
