"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ActionButton from "../ui/ActionButton/ActionButton";
import "./style.scss";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Determine entrance delay depending on whether the global intro loader is running
    const hasSeenIntro = sessionStorage.getItem("tsol-intro-done");
    const initDelay = hasSeenIntro ? 0.3 : 3.4; // Sync with IntroLoader finish

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: initDelay });

      // ── Initial setup
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(".hero-line-anim", {
        yPercent: 120, // push down outside the overflow:hidden wrapper
        opacity: 1
      });
      gsap.set([titleRef.current, subtitleRef.current], {
        yPercent: 100,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      });
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
      gsap.set(rightTextRef.current, { xPercent: 20, opacity: 0 });

      // ── Animation sequence
      tl.to(imageRef.current, {
        scale: 1, // beautiful slow zoom out
        duration: 2.8,
        ease: "power2.out",
      })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }, "<0.2")

        // Staggered reveal of small "The Shape of Life" lines cleanly pushing up into view
        .to(".hero-line-anim", {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
        }, "<0.4")

        // Huge Title + Subtext mask reveals
        .to([titleRef.current, subtitleRef.current], {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }, "<0.25")

        // Buttons and right text drift in
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "<0.3")
        .to(rightTextRef.current, {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }, "<0.1");
    }, containerRef); // << scoped to containerRef, so ".hero-line-anim" is uniquely local!

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section-main" aria-label="Hero" ref={containerRef}>
      <div className="hero-section-container container">
        <div className="hero-card">
          <Image
            ref={imageRef}
            src="/images/hero-image.png"
            alt="Contemporary architecture building"
            fill
            priority
            className="hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
          />
          <div className="hero-overlay" aria-hidden="true" ref={overlayRef} />

          <div className="hero-content">
            <div className="left-section">
              <p className="hero-shape-text">
                <span className="hero-line-mask"><span className="hero-line-anim">The</span></span>
                <span className="hero-line-mask"><span className="hero-line-anim">Shape</span></span>
                <span className="hero-line-mask"><span className="hero-line-anim">of Life</span></span>
              </p>

              <div className="hero-mask-wrap">
                <h1 className="hero-title" ref={titleRef}>TSOL</h1>
              </div>

              <div className="hero-mask-wrap">
                <p className="hero-subtitle" ref={subtitleRef}>architecture</p>
              </div>

              <div className="hero-actions" ref={buttonsRef}>
                <ActionButton href="#" variant="outline">
                  View Portfolio
                </ActionButton>
                <ActionButton href="#" variant="solid">
                  Discuss your space
                </ActionButton>
              </div>
            </div>

            <p className="right-section" ref={rightTextRef}>shape your life</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
