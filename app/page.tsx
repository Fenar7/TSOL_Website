import AboutSection from "./components/AboutSection/AboutSection";
import ContactCtaSection from "./components/ContactCtaSection/ContactCtaSection";
import Hero from "./components/Hero/Hero";
import OurApproachSection from "./components/OurApproachSection/OurApproachSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { getTestimonials } from "./lib/queries";

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <main className="home-main">
      <Hero />
      <AboutSection />
      <OurApproachSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactCtaSection />
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
