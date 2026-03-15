"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const approachImageOne = "/images/our-approach-1.png";
const approachImageTwo = "/images/our-approach-2.png";
const approachImageThree = "/images/our-approach-3.png";

const OurApproachSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%", // Earliest possible moment
          toggleActions: "restart none none reverse",
        },
      });

      tl.fromTo(".our-approach-kicker-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.2, ease: "power4.inOut" }
      )
        .fromTo(".our-approach-kicker",
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(".our-approach-copy",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(".our-approach-card-number",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(".our-approach-img-wrap",
          { clipPath: "inset(100% 0 0% 0)" },
          { clipPath: "inset(0% 0 0% 0)", duration: 1.2, stagger: 0.2, ease: "power4.inOut" },
          "-=0.5"
        )
        .fromTo(".our-approach-card-image",
          { scale: 1.35 },
          { scale: 1, duration: 1.8, stagger: 0.2, ease: "power2.out" },
          "<"
        )
        .fromTo(".our-approach-card-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=1.4"
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
    let resumeTimer = 0;

    const advance = () => {
      if (paused || window.innerWidth > 767) return;
      const items = Array.from(slider.children) as HTMLElement[];
      idx = (idx + 1) % items.length;
      const target = items[idx];
      if (target) {
        slider.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      }
    };

    const onTouch = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { paused = false; }, 5000);
    };

    slider.addEventListener("touchstart", onTouch, { passive: true });
    const timer = setInterval(advance, 6000);
    return () => {
      clearInterval(timer);
      window.clearTimeout(resumeTimer);
      slider.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <section className="our-approach-main" aria-label="Our Approach" ref={sectionRef}>
      <div className="our-approach-container container">
        <div className="our-approach-intro">
          <div className="our-approach-kicker-row">
            <span className="our-approach-kicker-line" aria-hidden="true" />
            <p className="our-approach-kicker">Our Approach</p>
            <span className="our-approach-kicker-line" aria-hidden="true" />
          </div>

          {/* <p className="our-approach-copy">
            The buildings form emerges from lived patterns. Instead of starting
            with dramatic shapes or fashionable style,{" "}
            <strong className="our-approach-copy-large">TSOL, thinks</strong> about{" "}
            <strong>The Shape of Life</strong> start with daily human activities..
            how people move, pause, how they meet, rest , argue, celebrate or feel
            safe. A kitchen becomes central because family life gathers there -
            streets curve because people slow down and linger there - not because
            straight lines are more efficient.
          </p> */}
        </div>

        <div className="our-approach-cards" ref={sliderRef}>
          <article className="our-approach-card">
            <p className="our-approach-card-number">01</p>
            <div className="our-approach-img-wrap">
              <div
                className="our-approach-card-image"
                role="img"
                aria-label="Courtyard architecture with plants and people"
                style={{ backgroundImage: `url(${approachImageOne})` }}
              />
            </div>
            <p className="our-approach-card-text">
              <span className="our-approach-card-text-lead">Space</span> is defined
              by how it is lived in. By posture and movement, rest and gathering,
              silence and openness.
            </p>
          </article>

          <article className="our-approach-card">
            <p className="our-approach-card-number">02</p>
            <div className="our-approach-img-wrap">
              <div
                className="our-approach-card-image"
                role="img"
                aria-label="House and landscape approach view"
                style={{ backgroundImage: `url(${approachImageTwo})` }}
              />
            </div>
            <p className="our-approach-card-text">
              <span className="our-approach-card-text-lead">Soul</span> is what turns
              structure into presence. It is the quiet quality that makes a space
              feel alive and worth returning to.
            </p>
          </article>

          <article className="our-approach-card">
            <p className="our-approach-card-number">03</p>
            <div className="our-approach-img-wrap">
              <div
                className="our-approach-card-image"
                role="img"
                aria-label="Traditional house facade"
                style={{ backgroundImage: `url(${approachImageThree})` }}
              />
            </div>
            <p className="our-approach-card-text">
              <span className="our-approach-card-text-lead">Timeless</span> structures
              emerge from design that stays relevant to life, being rooted in
              unchanging human values and natural principles.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default OurApproachSection;
