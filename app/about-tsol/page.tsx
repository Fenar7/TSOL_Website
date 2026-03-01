import PageHeroSection from "../components/PageHeroSection/PageHeroSection";
import "./style.scss";

const page = () => {
  return (
    <main className="about-tsol-main">
      <PageHeroSection
        titleLead="The"
        titleMain="TSOL"
        subtitle="Architecture grounded in timeless principles and values"
        imageSrc="/images/about-hero-image.png"
        imageAlt="TSOL interior space"
        priority
      />
    </main>
  );
};

export default page;
