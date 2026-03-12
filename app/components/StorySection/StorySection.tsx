"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageUrl = "/images/akbar-khan-architect.png";

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "restart none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".story-portrait-wrap",
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.9 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.22, ease: "power4.inOut" }
      )
        .fromTo(
          ".story-portrait",
          { scale: 1.2, yPercent: 4 },
          { scale: 1, yPercent: 0, duration: 1.85, ease: "power2.out" },
          "<"
        )
        .fromTo(
          ".story-title",
          { opacity: 0, yPercent: 118 },
          { opacity: 1, yPercent: 0, duration: 0.8 },
          "-=1.02"
        )
        .fromTo(
          ".story-subtitle",
          { opacity: 0, yPercent: 118 },
          { opacity: 1, yPercent: 0, duration: 0.66 },
          "-=0.62"
        )
        .fromTo(
          ".story-paragraph",
          { opacity: 0, y: 34, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.13,
          },
          "-=0.35"
        )
        .fromTo(
          ".story-inline-brand-tsol",
          { letterSpacing: "0.12em", opacity: 0.3 },
          { letterSpacing: "0em", opacity: 1, duration: 0.58, ease: "power2.out" },
          "-=0.52"
        );

      mm.add("(min-width: 768px)", () => {
        gsap.to(".story-portrait", {
          yPercent: 7,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(".story-portrait", {
          yPercent: 4,
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        });
      });
    }, sectionRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      clearTimeout(timer);
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="story-section-main" aria-label="The Founder Story" ref={sectionRef}>
      <div className="story-section-container container">
        <div className="story-portrait-wrap">
          <Image
            src={imageUrl}
            alt="Akbar Khan seated at a desk"
            fill
            className="story-portrait"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) min(557px, calc(100vw - 40px)), 557px"
          />
        </div>

        <div className="story-heading">
          <div className="story-title-mask">
            <h2 className="story-title">Akbar Khan Architect</h2>
          </div>
          <div className="story-subtitle-mask">
            <p className="story-subtitle">The Founder &amp; Principal Architect</p>
          </div>
        </div>

        <div className="story-body">
          <p className="story-paragraph">
            A seasoned and innovative architect with over three decades of proven expertise in
            conceiving and bringing to fruition a diverse array of residential, commercial,
            healthcare, and public projects. Graduated from the College of Engineering Trivandrum
            in 1991, his journey began as a freelancing architect, evolving into the establishment
            of Akbar Khan Associates in 1994. Through the years, he has cultivated a distinctive
            style and approach, earning the trust and loyalty of a discerning clientele.
          </p>

          {/* <p className="story-inline-brand story-paragraph" aria-label="TSOL architecture">
            <span className="story-inline-brand-tsol">TSOL</span>
            <span className="story-inline-brand-word">architecture</span>
          </p>

          <p className="story-paragraph">
            Our proficiency extends to utilising a spectrum of cutting-edge software tools, to
            seamlessly translate creative visions into tangible designs. Adept at budget planning,
            negotiation, and project appraisal, we navigate complex landscapes to ensure alignment
            with client expectations and stakeholder interests.
          </p>

          <p className="story-paragraph">
            With a track record of delivering successful projects and an unwavering commitment to
            design excellence, we bring a unique blend of creativity, experience, and business
            acumen to every architectural endeavour.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
