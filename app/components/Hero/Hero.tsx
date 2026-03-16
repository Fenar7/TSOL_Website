"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./style.scss";

const FALLBACK_IMAGE = "/images/hero-image.png";

const Hero = ({ imageUrl }: { imageUrl?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftBrandRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
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
      gsap.set(leftBrandRef.current, { y: 34, opacity: 0 });
      gsap.set(philosophyRef.current, { y: 24, opacity: 0 });

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
        .to(leftBrandRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }, "<0.45")
        .to(philosophyRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, "<0.22");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section-main" aria-label="Hero" ref={containerRef}>
      <div className="hero-section-container container">
        <div className="hero-card">
          <Image
            ref={imageRef}
            src={imageUrl || FALLBACK_IMAGE}
            alt="Contemporary architecture building"
            fill
            priority
            className="hero-image"
            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
          />
          <div className="hero-overlay" aria-hidden="true" ref={overlayRef} />

          <div className="hero-content">
            <div className="hero-left-brand" ref={leftBrandRef}>
              <h1 className="hero-brand-title">TSOL</h1>
              <p className="hero-brand-subtitle">architecture</p>
            </div>

            <div className="hero-philosophy-wrap" ref={philosophyRef}>
              <p className="hero-philosophy">
                <span className="hero-philosophy-lead">The Shape Of Life, </span>
                <span className="hero-philosophy-tsol">TSOL</span>
                <span className="hero-philosophy-rest">
                  {" "}
                  (tee-sol), is more than a name, it&apos;s a philosophy - the
                  sacred union form and spirit, where buildings rise not as inert
                  structures but as a sanctuary for the human soul.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
