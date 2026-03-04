"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const theSoulImageUrl = "/images/the-soul.png";

const TheSoulSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerLineRef = useRef<HTMLSpanElement>(null);
  const kickerTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      });

      // 1. Kicker line grows from left
      tl.fromTo(
        kickerLineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, ease: "power4.inOut" }
      )

        // 2. Kicker text drifts in
        .fromTo(
          kickerTextRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
          "-=0.35"
        )

        // 3. Left column paragraphs — staggered upward reveal
        .fromTo(
          ".the-soul-copy p",
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.18, ease: "power3.out" },
          "-=0.25"
        )

        // 4. Image wrapper unmasked from the bottom upward
        .fromTo(
          ".the-soul-img-wrap",
          { clipPath: "inset(100% 0 0% 0)" },
          { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power4.inOut" },
          "<0.1"
        )

        // 5. Inner image zooms out while revealed
        .fromTo(
          ".the-soul-image",
          { scale: 1.3 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="the-soul-main" aria-label="The Soul" ref={sectionRef}>
      <div className="the-soul-container container">
        <div className="the-soul-left-column">
          <div className="the-soul-kicker-row">
            <span className="the-soul-kicker-line" aria-hidden="true" ref={kickerLineRef} />
            <p className="the-soul-kicker" ref={kickerTextRef}>The Soul</p>
          </div>

          <div className="the-soul-copy">
            <p>
              At <strong>TSOL, The Soul of Architecture</strong> is the embodiment
              of human experiences, aspirations and stories .The Soul of Architecture
              lies in its ability to transform spaces into places that evoke
              emotions, inspire connection, and reflect the inner world of those who
              inhabit them.
            </p>

            <p>
              Architecture is a dialogue between the built environment and the human
              spirit we strive to create spaces that not only functional but also
              connect with the deepest aspects of need for harmony, expression and
              belonging.
            </p>
          </div>
        </div>

        <div className="the-soul-right-column">
          <div className="the-soul-img-wrap">
            <div
              className="the-soul-image"
              role="img"
              aria-label="Landscape with water body and elevated residence"
              style={{ backgroundImage: `url(${theSoulImageUrl})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheSoulSection;
