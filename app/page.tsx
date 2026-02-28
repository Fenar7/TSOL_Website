import AboutSection from "./components/AboutSection/AboutSection";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import OurApproachSection from "./components/OurApproachSection/OurApproachSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TheSoulSection from "./components/TheSoulSection/TheSoulSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-main">
        <Hero />
        <AboutSection />
        <OurApproachSection />
        <TheSoulSection />
        <ProjectsSection />
        <ServicesSection/>
      </main>
    </>
  );
}
