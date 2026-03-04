"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const contactCtaImageUrl = "/images/our-motto-image.png";

const ContactCtaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      });

      // 1. Section title block (label + italic heading + subtitle) fades + rises
      tl.fromTo(
        ".contact-cta-title",
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      )

        // 2. Image wrapper — clip-path wipes down from top to reveal the photo
        .fromTo(
          ".contact-cta-img-wrap",
          { clipPath: "inset(0% 0 100% 0)" },   // top-to-bottom wipe (different from other sections)
          { clipPath: "inset(0% 0 0% 0)", duration: 1.3, ease: "power4.inOut" },
          "-=0.35"
        )

        // 3. Inner photo scales out while the mask opens
        .fromTo(
          ".contact-cta-image",
          { scale: 1.22 },
          { scale: 1, duration: 2, ease: "power2.out" },
          "<"
        )

        // 4. CTA buttons slide up from below with slight stagger
        .fromTo(
          ".contact-cta-btn",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-cta-main" ref={sectionRef}>
      <div className="contact-cta-section-container flex items-center justify-center">
        <div className="contact-cta-section container">
          <SectionTitle
            className="contact-cta-title"
            label="Our Motto"
            subtitle="Architecture with a broader vision, and deeper engagement with design practice, energised by a new generation of architects and engineers grounded in timeless principles and values"
            title="Let's Shape Life Together"
          />

          {/* Wrapper for clip-path mask + zoom */}
          <div className="contact-cta-img-wrap">
            <div
              className="contact-cta-image"
              role="img"
              aria-label="Courtyard home surrounded by trees and tropical planting"
              style={{ backgroundImage: `url(${contactCtaImageUrl})` }}
            />
          </div>

          <div className="contact-cta-actions">
            <ActionButton href="/projects" variant="outline-dark" className="contact-cta-btn">
              Explore Projects
            </ActionButton>
            <ActionButton href="/contact" variant="solid-dark" className="contact-cta-btn">
              Request a Consultation
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCtaSection;
