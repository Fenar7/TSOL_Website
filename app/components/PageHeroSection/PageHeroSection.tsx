import Image from "next/image";
import "./style.scss";

type PageHeroSectionProps = {
  titleLead?: string;
  titleMain?: string;
  subtitle: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
};

const PageHeroSection = ({
  titleLead = "The",
  titleMain = "TSOL",
  subtitle,
  imageSrc,
  imageAlt = "Architectural interior",
  className = "",
  priority = false,
}: PageHeroSectionProps) => {
  return (
    <section
      className={`page-hero-section-main ${className}`.trim()}
      aria-label={`${titleLead} ${titleMain}`.trim()}
    >
      <div className="page-hero-section container">
        <div className="page-hero-card">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            className="page-hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
          />
          <div className="page-hero-overlay" aria-hidden="true" />

          <div className="page-hero-content">
            <h1 className="page-hero-title">
              {titleLead ? (
                <span className="page-hero-title-lead">{titleLead}</span>
              ) : null}
              {titleMain ? (
                <span className="page-hero-title-main">{titleMain}</span>
              ) : null}
            </h1>
            <p className="page-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
