import ContactInfoSection from "../components/ContactInfoSection/ContactInfoSection";
import ContactMapSection from "../components/ContactMapSection/ContactMapSection";
import PageHeroSection from "../components/PageHeroSection/PageHeroSection";
import "./style.scss";

const page = () => {
  return (
    <main className="contact-page-main">
      <PageHeroSection
        title="Let’s Create Something Extraordinary Together"
        subtitle="Contact us to begin your story: let’s shape life together"
        imageSrc="/images/contact-hero-image.png"
        imageAlt="Contact page hero showing warm architectural entrance"
        contentAlign="center"
        overlayOpacity={0.35}
        className="contact-page-hero"
        priority
      />
      <ContactInfoSection />
      <ContactMapSection />
    </main>
  );
};

export default page;
