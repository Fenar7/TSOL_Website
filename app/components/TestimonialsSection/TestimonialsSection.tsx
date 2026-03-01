"use client";

import { useRef } from "react";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: "prev" | "next") => {
    if (!trackRef.current) {
      return;
    }

    const card = trackRef.current.querySelector<HTMLElement>(".testimonial-video");
    const cardWidth = card?.offsetWidth ?? 508;
    const gap = 27;
    const offset = cardWidth + gap;

    trackRef.current.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? offset : -offset,
    });
  };

  return (
    <section className="testimonials-main">
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
                ←
              </button>
              <button
                type="button"
                className="testimonials-nav-btn"
                onClick={() => scrollTrack("next")}
                aria-label="Next testimonials"
              >
                →
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
