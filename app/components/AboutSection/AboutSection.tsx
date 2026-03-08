"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const aboutImageUrl = "/images/about-image.png";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerLineRef = useRef<HTMLSpanElement>(null);
  const kickerTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // ── ScrollTrigger timeline ──
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // 1. Kicker line draws across
      tl.fromTo(kickerLineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, ease: "power4.inOut" }
      )

        // 2. Kicker text drifts in
        .fromTo(kickerTextRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.4"
        )

        // 3. Image mask sweeps open
        .fromTo(".about-img-wrap",
          { clipPath: "inset(100% 0 0% 0)" },
          { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power4.inOut" },
          "-=0.3"
        )

        // 4. Image zooms out inside mask
        .fromTo(".about-image",
          { scale: 1.35 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
          "<"
        )

        // 5. Paragraphs stunning reveal
        .fromTo(".about-copy p",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "<0.2"
        )

        // 6. Know More link
        .fromTo(".about-know-more",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.8"
        )

        // 7. Stat titles
        .fromTo(".about-stat-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        )

        // 8. Stat divider grows
        .fromTo(".about-stat-divider",
          { scaleY: 0, opacity: 0, transformOrigin: "bottom center" },
          { scaleY: 1, opacity: 1, duration: 0.6, ease: "power4.out" },
          "-=0.8"
        )

        // 9. Stat supporting text
        .fromTo(".about-stat-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.5"
        )

        // 10. Caption fades and lifts
        .fromTo(".about-caption",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );

    }, sectionRef);

    // Refresh ScrollTrigger after layout settles (important on mobile)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section className="about-section-main" aria-label="About TSOL" ref={sectionRef}>
      <div className="about-section-container container">
        <div className="about-left-column">
          <div className="about-kicker-row">
            {/* <span className="about-kicker-line" aria-hidden="true" ref={kickerLineRef} /> */}
            {/* <p className="about-kicker" ref={kickerTextRef}>What is TSOL</p> */}
          </div>

          <div className="about-copy">
            <p>
              In architecture, the shape of life is a poetic way of talking about how buildings are shaped around everyday life patterns.

              For instance, how people move and pause in a home, how they meet, rest, argue, celebrate or feel safe. A kitchen becomes central because family life gathers there; streets curve so that people can slow down and linger there—not because straight lines are more efficient.

              At TSOL, we ask: what shape does human life naturally want to take, and how can architecture support it?

            </p>

            <p>
              <strong className="about-philosophy-label">Philosophy</strong>
            </p>

            <p>
              <strong className="about-inline-tsol">The Shape Of Life</strong>,{" "}
              TSOL <em>(tee-sol)</em>, is more than a name, it&apos;s a
              philosophy—the sacred union form and spirit, where buildings rise
              not as inert structures but as a sanctuary for the human soul.
            </p>

            <p>
              &quot;Each thing has an outer as well as an inner meaning every external
              form is complimented by an inner reality which is its hidden, internal
              essence. The <em>manifest</em> is the sensible form, that which
              emphasises the quantitative aspect which is most readily comprehensible,
              such as the shape of a building, the form of a pool, the body of a
              man. The <em>hidden</em> is the essential or qualitative aspect which
              all things possess.
            </p>
            <p>
              In order to know a thing is in its completeness, one must not only
              seek its outward and ephemeral reality but also its essential and
              inward reality—that in which the eternal beauty of every object
              resides.&quot;
            </p>
          </div>

          <a className="about-know-more" href="/about-tsol">
            <span>Know More</span>
            <span className="about-know-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <div className="about-stats">
            <article className="about-stat">
              <p className="about-stat-title">Since 1991</p>
              <p className="about-stat-text">Practice led by Akbar Khan Architect</p>
            </article>
            <span className="about-stat-divider" aria-hidden="true" />
            <article className="about-stat">
              <p className="about-stat-title">250+</p>
              <p className="about-stat-text">Projects delivered across sectors</p>
            </article>
          </div>
        </div>

        <div className="about-right-column">
          <div className="about-img-wrap">
            <div
              className="about-image"
              role="img"
              aria-label="Interior architectural latticework with filtered natural light"
              style={{ backgroundImage: `url(${aboutImageUrl})` }}
            />
          </div>
          <p className="about-caption">
            the light filters through latticework - evoking the breath of nature..
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
