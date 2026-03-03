"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: "testimonial-1",
    imageUrl: "https://www.figma.com/api/mcp/asset/4e320b30-03b7-4b1a-ae16-73d1f14ae4db",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    title: "Client testimonial one",
  },
  {
    id: "testimonial-2",
    imageUrl: "https://www.figma.com/api/mcp/asset/6e484c57-9484-4dc9-b408-032af96f1c3f",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "Client testimonial two",
  },
  {
    id: "testimonial-3",
    imageUrl: "https://www.figma.com/api/mcp/asset/8ac7684a-0300-4a2a-9375-3f9beaf8514f",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Client testimonial three",
  },
  {
    id: "testimonial-4",
    imageUrl: "https://www.figma.com/api/mcp/asset/4e320b30-03b7-4b1a-ae16-73d1f14ae4db",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    title: "Client testimonial four",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // ── scroll-track navigation ──
  const scrollTrack = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLElement>(".testimonial-video");
    const cardWidth = card?.offsetWidth ?? 508;
    const gap = 27;
    trackRef.current.scrollBy({ behavior: "smooth", left: direction === "next" ? cardWidth + gap : -(cardWidth + gap) });
  };

  // ── GSAP scroll animations ──
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      });

      // 1. Section label + title fade + rise from the left
      tl.fromTo(
        ".testimonials-title",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
      )

        // 2. Nav arrows materialise from the right — one by one
        .fromTo(
          ".testimonials-nav-btn",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.12, ease: "power3.out" },
          "-=0.45"
        )

        // 3. Video cards stream in horizontally with depth stagger
        //    Each card starts slightly below + to the right, creating a "cascade" effect
        .fromTo(
          ".testimonial-video",
          { opacity: 0, x: 70, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-main" ref={sectionRef}>
      <div className="testimonials-section-container flex items-center justify-center">
        <div className="testimonials-section container">
          <div className="testimonials-heading-row">
            <SectionTitle
              className="testimonials-title"
              label="Testimonials"
              title="What Stayed With Them"
            />

            <div className="testimonials-nav">
              <button
                type="button"
                className="testimonials-nav-btn"
                onClick={() => scrollTrack("prev")}
                aria-label="Previous testimonials"
              >
                <Image
                  src="/images/icons/testimonial-arrow.png"
                  alt=""
                  aria-hidden="true"
                  className="testimonials-nav-icon testimonials-nav-icon--prev"
                  height={56}
                  width={56}
                />
              </button>
              <button
                type="button"
                className="testimonials-nav-btn"
                onClick={() => scrollTrack("next")}
                aria-label="Next testimonials"
              >
                <Image
                  src="/images/icons/testimonial-arrow.png"
                  alt=""
                  aria-hidden="true"
                  className="testimonials-nav-icon"
                  height={56}
                  width={56}
                />
              </button>
            </div>
          </div>

          <div className="testimonial-video-container" ref={trackRef}>
            {testimonials.map((item) => (
              <a
                key={item.id}
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="testimonial-video"
                aria-label={`Play ${item.title}`}
              >
                <div
                  className="testimonial-video-image"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <span className="testimonial-video-overlay" aria-hidden="true" />
                <span className="testimonial-video-play" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
