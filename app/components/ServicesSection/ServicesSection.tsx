"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const servicesItems = [
  {
    id: "service-architecture",
    imageUrl: "/images/architecture.png",
    title: "Architecture",
    description:
      "We design with lived experience in mind. Plans are shaped for posture, movement, rest, gathering, and openness, so the space feels clear, calm, and true to life.",
  },
  {
    id: "service-interiors",
    imageUrl: "/images/interior.png",
    title: "Interiors",
    description:
      "Interiors carry the soul of daily life. Proportion, material, comfort, and atmosphere are held with care, so the space feels human, grounded, and worth returning to.",
  },
  {
    id: "service-landscaping",
    imageUrl: "/images/landscaping.png",
    title: "Landscaping",
    description:
      "Landscape extends the space into nature. Shade, air, paths, and quiet corners are shaped to feel natural through the day, and to mature with time.",
  },
];

const ServicesSection = () => {
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

      // 1. Section label + title fade up
      tl.fromTo(
        ".services-section-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )

        // 2. Cards materialise — rise from below with stagger
        .fromTo(
          ".service-item",
          { opacity: 0, y: 80, borderColor: "transparent" },
          {
            opacity: 1,
            y: 0,
            borderColor: "var(--stroke-grey, #d8d5cc)",
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // 3. Images inside cards — clip-path reveal bottom-to-top with zoom
        .fromTo(
          ".service-img-wrap",
          { clipPath: "inset(100% 0 0% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.1,
            stagger: 0.15,
            ease: "power4.inOut",
          },
          "<"
        )
        .fromTo(
          ".service-item-image",
          { scale: 1.25 },
          { scale: 1, duration: 1.8, stagger: 0.15, ease: "power2.out" },
          "<"
        )

        // 4. Title text inside each card drift up
        .fromTo(
          ".service-item-title",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=1.4"
        )

        // 5. Description text fade up with slight delay
        .fromTo(
          ".service-item-description",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section-main" ref={sectionRef}>
      <div className="services-section-container flex items-center justify-center">
        <div className="services-section-content container">
          <SectionTitle
            className="services-section-title"
            label="Services"
            title="The Shape Of Life"
          />

          <div className="services-items-container">
            {servicesItems.map((item) => (
              <article key={item.id} className="service-item">
                {/* Wrapper div for clip-path mask — keeps border-radius on card intact */}
                <div className="service-img-wrap">
                  <div
                    className="service-item-image"
                    role="img"
                    aria-label={item.title}
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                </div>
                <h3 className="service-item-title">{item.title}</h3>
                <p className="service-item-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
