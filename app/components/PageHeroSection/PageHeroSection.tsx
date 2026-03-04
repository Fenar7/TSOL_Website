"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

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
  /** When true, play an on-load entrance animation for the hero */
  animated?: boolean;
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
  animated = false,
}: PageHeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const ariaTitle = title ?? `${titleLead} ${titleMain}`.trim();
  const contentClassName = `page-hero-content ${contentAlign === "center" ? "is-centered" : ""
    }`.trim();

  useLayoutEffect(() => {
    if (!animated) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Card zooms from slightly larger and fades in
      tl.fromTo(
        ".page-hero-card",
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      )

        // 2. Overlay dims in from transparent
        .fromTo(
          ".page-hero-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "<0.3"
        )

        // 3. Title drifts up from below
        .fromTo(
          ".page-hero-title",
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )

        // 4. Subtitle follows slightly after
        .fromTo(
          ".page-hero-subtitle",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [animated]);

  return (
    <section
      className={`page-hero-section-main ${className}`.trim()}
      aria-label={ariaTitle}
      ref={sectionRef}
      style={{ "--page-hero-overlay-opacity": overlayOpacity.toString() } as CSSProperties}
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
