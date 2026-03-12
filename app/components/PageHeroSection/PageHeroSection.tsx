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
  /** When true, show Instagram and Facebook icon links below subtitle */
  showSocials?: boolean;
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
  showSocials = false,
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
        )

        // 5. Social icons pop in
        .fromTo(
          ".page-hero-social-link",
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(2)" },
          "-=0.3"
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

            {showSocials && (
              <div className="page-hero-socials">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="page-hero-social-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="page-hero-social-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
