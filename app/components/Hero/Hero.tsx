import Image from "next/image";
import ActionButton from "../ui/ActionButton/ActionButton";
import "./style.scss";

const Hero = () => {
  return (
    <section className="hero-section-main" aria-label="Hero">
      <div className="hero-section-container container">
        <div className="hero-card">
          <Image
            src="/images/hero-image.png"
            alt="Contemporary architecture building"
            fill
            priority
            className="hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <div className="left-section">
              <p className="hero-shape-text">
                The
                <br />
                Shape
                <br />
                of Life
              </p>
              <h1 className="hero-title">TSOL</h1>
              <p className="hero-subtitle">architecture</p>
              <div className="hero-actions">
                <ActionButton href="#" variant="outline">
                  View Portfolio
                </ActionButton>
                <ActionButton href="#" variant="solid">
                  Discuss your space
                </ActionButton>
              </div>
            </div>
            <p className="right-section">shape your life</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
