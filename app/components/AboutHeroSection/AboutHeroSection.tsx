import Image from "next/image";
import "./style.scss";

const aboutHeroCopy =
  "In architecture, the shape of life is a poetic way of talking about how buildings are shaped around everyday life patterns. For instance, how people move and pause in a home, how they meet, rest, argue, celebrate or feel safe. A kitchen becomes central because family life gathers there; streets curve so that people can slow down and linger there-not because straight lines are more efficient. At TSOL, we ask: what shape does human life naturally want to take, and how can architecture support it?";

const AboutHeroSection = () => {
  return (
    <section className="about-hero-main" aria-label="About TSOL introduction">
      <div className="about-hero-container container">
        <h1 className="about-hero-title">TSOL</h1>

        <div className="about-hero-image-wrap">
          <Image
            src="/images/about-tsol-image.png"
            alt="Sketch illustration of a tropical residence"
            fill
            priority
            className="about-hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 865px"
          />
        </div>

        <p className="about-hero-copy">{aboutHeroCopy}</p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
