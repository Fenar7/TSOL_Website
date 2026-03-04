"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const mapEmbedUrl =
  "https://maps.google.com/maps?q=Akbar%20Khan%20Architect%2C%20Civil%20Station%2C%20Kozhikode&t=&z=16&ie=UTF8&iwloc=&output=embed";

const ContactMapSection = () => {
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

      // Map frame wipes in from bottom using clip-path, then the inner iframe scales out
      tl.fromTo(
        ".contact-map-frame",
        { clipPath: "inset(100% 0 0% 0)", opacity: 0 },
        { clipPath: "inset(0% 0 0% 0)", opacity: 1, duration: 1.3, ease: "power4.inOut" }
      )
        .fromTo(
          ".contact-map-frame iframe",
          { scale: 1.1 },
          { scale: 1, duration: 2, ease: "power2.out" },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-map-section" aria-label="Location map" ref={sectionRef}>
      <div className="contact-map-container container">
        <div className="contact-map-frame">
          <iframe
            title="Akbar Khan Architect location map"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
