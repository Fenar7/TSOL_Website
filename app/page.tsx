import ClientQuotesSection from "./components/ClientQuotesSection/ClientQuotesSection";
import ContactCtaSection from "./components/ContactCtaSection/ContactCtaSection";
import Hero from "./components/Hero/Hero";
import OurApproachSection from "./components/OurApproachSection/OurApproachSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import StorySection from "./components/StorySection/StorySection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { getTestimonials, getHeroImageUrl, getApproachItems } from "./lib/queries";

export default async function Home() {
  const [testimonials, heroImageUrl, approachItems] = await Promise.all([
    getTestimonials(),
    getHeroImageUrl(),
    getApproachItems(),
  ]);

  return (
    <main className="home-main">
      <Hero imageUrl={heroImageUrl ?? undefined} />
      <OurApproachSection items={approachItems} />
      <ServicesSection />
      <StorySection headingTop />
      <ClientQuotesSection />
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
