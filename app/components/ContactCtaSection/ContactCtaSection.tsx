"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const contactCtaImageSrc = "/images/contact-cta-section.png";
const mottoSummary =
  "Architecture that is not only functional but connects with a deep human need for harmony, expression and belonging.";
const mottoQuote =
  "\"Each thing has an outer as well as an inner meaning every external form is complimented by an inner reality which is its hidden, internal essence. The manifest is the sensible form, that which emphasises the quantitative aspect which is most readily comprehensible, such as the shape of a building, the form of a pool, the body of a man. The hidden is the essential or qualitative aspect which all things possess. In order to know a thing is in its completeness, one must not only seek its outward and ephemeral reality but also its essential and inward reality-that in which the eternal beauty of every object resides.\"";

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
        .fromTo(
          ".contact-cta-quote",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=1.1"
        )
        .fromTo(
          ".contact-cta-source",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.52"
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
            subtitle={mottoSummary}
            title="Let’s Shape Life Together"
          />

          {/* Wrapper for clip-path mask + zoom */}
          <div className="contact-cta-img-wrap">
            <Image
              src={contactCtaImageSrc}
              alt="TSOL - architectural space"
              className="contact-cta-image"
              width={1400}
              height={900}
              sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), min(100%, 1200px)"
              priority={false}
            />
          </div>

          <div className="contact-cta-text-block">
            <p className="contact-cta-quote">{mottoQuote}</p>

            <div className="contact-cta-source">
              <p className="contact-cta-source-title">-The Sense of Unity</p>
              <p className="contact-cta-source-authors">
                Nader Ardalan &amp; Laleh Bakhtiar
              </p>
            </div>
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
