import Image from "next/image";
import type { CSSProperties } from "react";
import "./style.scss";

type PageHeroSectionProps = {
  title?: string;
  titleLead?: string;
  titleMain?: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
  contentAlign?: "left" | "center";
  overlayOpacity?: number;
};

const PageHeroSection = ({
  title,
  titleLead = "The",
  titleMain = "TSOL",
  subtitle,
  imageSrc,
  imageAlt = "Architectural interior",
  className = "",
  priority = false,
  contentAlign = "left",
  overlayOpacity = 0.2,
}: PageHeroSectionProps) => {
  const ariaTitle = title ?? `${titleLead} ${titleMain}`.trim();
  const contentClassName = `page-hero-content ${
    contentAlign === "center" ? "is-centered" : ""
  }`.trim();

  return (
    <section
      className={`page-hero-section-main ${className}`.trim()}
      aria-label={ariaTitle}
      style={
        {
          "--page-hero-overlay-opacity": overlayOpacity.toString(),
        } as CSSProperties
      }
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

          <div className={contentClassName}>
            {title ? (
              <h1 className="page-hero-title page-hero-title-single">{title}</h1>
            ) : (
              <h1 className="page-hero-title">
                {titleLead ? (
                  <span className="page-hero-title-lead">{titleLead}</span>
                ) : null}
                {titleMain ? (
                  <span className="page-hero-title-main">{titleMain}</span>
                ) : null}
              </h1>
            )}
            {subtitle ? <p className="page-hero-subtitle">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
