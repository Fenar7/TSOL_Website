import AboutHeroSection from "../components/AboutHeroSection/AboutHeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import StorySection from "../components/StorySection/StorySection";
import "./style.scss";
import ContactCtaSection from "../components/ContactCtaSection/ContactCtaSection";

const page = () => {
  return (
    <main className="about-tsol-main">
      <AboutHeroSection/>
      <StorySection />
      <ContactCtaSection />
    </main>
  );
};

export default page;
