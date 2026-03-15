"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const servicesItems = [
  {
    id: "service-architecture",
    categoryParam: "architecture",
    imageUrl: "/images/architecture.png",
    title: "Architecture",
    description:
      "Design with lived experience in mind. Plans are shaped for posture, movement, rest, gathering, and openness, so the space feels clear, calm, and true to life.",
  },
  {
    id: "service-interiors",
    categoryParam: "interiors",
    imageUrl: "/images/interior.png",
    title: "Interiors",
    description:
      "Interiors carry the soul of daily life. Proportion, material, comfort, and atmosphere are held with care, so the space feels human, grounded, and worth returning to.",
  },
  {
    id: "service-landscaping",
    categoryParam: "landscaping",
    imageUrl: "/images/landscaping.png",
    title: "Landscaping",
    description:
      "Landscape extends the space into nature. Shade, air, paths, and quiet corners are shaped to feel natural through the day, and to mature with time.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.fromTo(
        ".services-section-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
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
        .fromTo(
          ".service-item-title",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Mobile auto-advance carousel ── */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let idx = 0;
    let paused = false;

    const advance = () => {
      if (paused || window.innerWidth > 767) return;
      const items = Array.from(slider.children) as HTMLElement[];
      idx = (idx + 1) % items.length;
      items[idx]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    };

    let resumeTimer = 0;
    const onTouch = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { paused = false; }, 5000);
    };
    slider.addEventListener("touchstart", onTouch, { passive: true });
    const timer = setInterval(advance, 3500);
    return () => {
      clearInterval(timer);
      clearTimeout(resumeTimer);
      slider.removeEventListener("touchstart", onTouch);
    };
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

          <div className="services-items-container" ref={sliderRef}>
            {servicesItems.map((item) => (
              <Link
                key={item.id}
                href={`/projects?category=${item.categoryParam}`}
                className="service-item service-item--link"
                aria-label={`View ${item.title} projects`}
              >
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
                <span className="service-item-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
