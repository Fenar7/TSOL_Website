"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const aboutHeroCopyLines = [
  "In architecture, the shape of life is a poetic way of talking about how buildings are shaped around everyday life patterns.",
  "For instance, how people move and pause in a home, how they meet, rest, argue, celebrate or feel safe.",
  "A kitchen becomes central because family life gathers there; streets curve so that people can slow down and linger there-not because straight lines are more efficient.",
  "What shape does human life naturally want to take, and how can architecture support it?",
];

const AboutHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasSeenIntro = sessionStorage.getItem("tsol-intro-done");
    const initDelay = hasSeenIntro ? 0.22 : 3.3;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: initDelay,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".about-hero-title",
        { opacity: 0, y: 42, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.82 }
      )
        .fromTo(
          ".about-hero-image-wrap",
          { clipPath: "inset(0% 0 100% 0%)", opacity: 0.9 },
          { clipPath: "inset(0% 0 0% 0%)", opacity: 1, duration: 1.35, ease: "power4.inOut" },
          "-=0.42"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.16, yPercent: 3 },
          { scale: 1, yPercent: 0, duration: 1.95, ease: "power2.out" },
          "<"
        )
        .fromTo(
          ".about-hero-copy-line",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.11 },
          "-=1.05"
        )
        .fromTo(
          ".about-hero-accent",
          { opacity: 0, scaleY: 0, transformOrigin: "top center" },
          { opacity: 1, scaleY: 1, duration: 0.72, ease: "power4.out" },
          "-=0.64"
        );

      mm.add("(min-width: 768px)", () => {
        gsap.to(imageRef.current, {
          yPercent: 8,
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(imageRef.current, {
          yPercent: 4,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
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
    <section className="about-hero-main" aria-label="About TSOL introduction" ref={sectionRef}>
      <div className="about-hero-container container">
        <h1 className="about-hero-title">TSOL</h1>

        <div className="about-hero-image-wrap">
          <Image
            ref={imageRef}
            src="/images/about-tsol-image.png"
            alt="Sketch illustration of a tropical residence"
            fill
            priority
            className="about-hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 865px"
          />
        </div>

        <p className="about-hero-copy">
          {aboutHeroCopyLines.map((line) => (
            <span key={line} className="about-hero-copy-line">
              {line}
            </span>
          ))}
        </p>
      </div>

      <span className="about-hero-accent" aria-hidden="true" />
    </section>
  );
};

export default AboutHeroSection;
