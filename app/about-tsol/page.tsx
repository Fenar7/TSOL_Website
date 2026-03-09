import AboutHeroSection from "../components/AboutHeroSection/AboutHeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import StorySection from "../components/StorySection/StorySection";
import "./style.scss";

const page = () => {
  return (
    <main className="about-tsol-main">
      <AboutHeroSection/>
      <AboutSection/>
      <StorySection />
    </main>
  );
};

export default page;
