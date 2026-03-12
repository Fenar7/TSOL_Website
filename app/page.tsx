import ClientQuotesSection from "./components/ClientQuotesSection/ClientQuotesSection";
import ContactCtaSection from "./components/ContactCtaSection/ContactCtaSection";
import Hero from "./components/Hero/Hero";
import OurApproachSection from "./components/OurApproachSection/OurApproachSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { getTestimonials } from "./lib/queries";

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <main className="home-main">
      <Hero />
      <OurApproachSection />
      <ServicesSection />
      <ClientQuotesSection />
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
