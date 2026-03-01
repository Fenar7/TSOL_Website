import AboutSection from "./components/AboutSection/AboutSection";
import ContactCtaSection from "./components/ContactCtaSection/ContactCtaSection";
import Hero from "./components/Hero/Hero";
import OurApproachSection from "./components/OurApproachSection/OurApproachSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import TheSoulSection from "./components/TheSoulSection/TheSoulSection";

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <AboutSection />
      <OurApproachSection />
      <TheSoulSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactCtaSection />
      <TestimonialsSection />
    </main>
  );
}
