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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "restart none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".story-portrait-wrap",
        { opacity: 0, y: 44, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.82 }
      )
      tl.fromTo(
        ".story-title",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
      )

        // 2. Subtitle — "Akbar Khan Architect" drifts in slightly after
        .fromTo(
          ".story-subtitle",
          { opacity: 0, x: -35 },
          { opacity: 1, x: 0, duration: 0.65, ease: "power3.out" },
          "-=0.45"
        )

        // 3. Designation — drifts up
        .fromTo(
          ".story-designation",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.35"
        )

        // 4. Body paragraphs — staggered upward reveal
        .fromTo(
          ".story-body p",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
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
          <h2 className="story-title">Akbar Khan Architect</h2>
          <p className="story-subtitle">The Founder &amp; Principal Architect</p>
        </div>

        <div className="story-body">
          <p>
            A seasoned and innovative architect with over three decades of proven expertise in
            conceiving and bringing to fruition a diverse array of residential, commercial,
            healthcare, and public projects. Graduated from the College of Engineering Trivandrum
            in 1991, his journey began as a freelancing architect, evolving into the establishment
            of Akbar Khan Associates in 1994. Through the years, he has cultivated a distinctive
            style and approach, earning the trust and loyalty of a discerning clientele.
          </p>

          <p className="story-inline-brand" aria-label="TSOL architecture">
            <span className="story-inline-brand-tsol">TSOL</span>
            <span className="story-inline-brand-word">architecture</span>
          </p>

          <p>
            Our proficiency extends to utilising a spectrum of cutting-edge software tools, to
            seamlessly translate creative visions into tangible designs. Adept at budget planning,
            negotiation, and project appraisal, we navigate complex landscapes to ensure alignment
            with client expectations and stakeholder interests.
          </p>

          <p>
            With a track record of delivering successful projects and an unwavering commitment to
            design excellence, we bring a unique blend of creativity, experience, and business
            acumen to every architectural endeavour.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
