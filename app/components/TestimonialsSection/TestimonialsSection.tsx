"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import Image from "next/image";
import type { SanityTestimonial } from "@/app/lib/queries";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

// ─── Video Lightbox ────────────────────────────────────────────────────────────
interface LightboxProps {
  testimonial: SanityTestimonial;
  onClose: () => void;
}

function VideoLightbox({ testimonial, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Animate in
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(panel, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }
    gsap.to(panel, { scale: 0.94, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentTime = duration ? (progress / 100) * duration : 0;

  return (
    <div
      ref={overlayRef}
      className="testimonial-lightbox-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Testimonial video"
    >
      <div ref={panelRef} className="testimonial-lightbox-panel">
        {/* Close */}
        <button type="button" className="testimonial-lightbox-close" onClick={close} aria-label="Close video">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Video */}
        <div className="testimonial-lightbox-video-wrap" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={testimonial.video.asset.url}
            className="testimonial-lightbox-video"
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {/* Centre play/pause flash */}
          {!isPlaying && (
            <div className="testimonial-lightbox-paused-icon" aria-hidden="true">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="rgba(0,0,0,0.55)" />
                <polygon points="21,16 39,26 21,36" fill="white" />
              </svg>
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="testimonial-lightbox-controls">
          {/* Play/Pause */}
          <button type="button" className="testimonial-lc-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <rect x="3" y="2" width="4" height="14" rx="1" />
                <rect x="11" y="2" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <polygon points="4,2 16,9 4,16" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div className="testimonial-lc-progress" onClick={seek} role="progressbar" aria-valuenow={progress}>
            <div className="testimonial-lc-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          {/* Time */}
          <span className="testimonial-lc-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Mute */}
          <button type="button" className="testimonial-lc-btn" onClick={() => { setIsMuted((m) => !m); if (videoRef.current) videoRef.current.muted = !isMuted; }} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6.5H6L10 3v12l-4-3.5H3V6.5Z" />
                <line x1="14" y1="7" x2="17" y2="10" /><line x1="17" y1="7" x2="14" y2="10" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6.5H6L10 3v12l-4-3.5H3V6.5Z" />
                <path d="M13 6.5c1 .8 1.5 1.7 1.5 2.5s-.5 1.7-1.5 2.5" />
                <path d="M15 4.5c1.7 1.5 2.5 3 2.5 4.5s-.8 3-2.5 4.5" />
              </svg>
            )}
          </button>

          {/* Fullscreen */}
          <button type="button" className="testimonial-lc-btn" onClick={() => videoRef.current?.requestFullscreen()} aria-label="Fullscreen">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="testimonial-lightbox-info">
          <p className="testimonial-lightbox-name">TSOL Documentary</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
interface TestimonialsSectionProps {
  testimonials: SanityTestimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<SanityTestimonial | null>(null);

  // ── scroll-track navigation ──
  const scrollTrack = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLElement>(".testimonial-video");
    const cardWidth = card?.offsetWidth ?? 508;
    const gap = 27;
    trackRef.current.scrollBy({ behavior: "smooth", left: direction === "next" ? cardWidth + gap : -(cardWidth + gap) });
  };

  // ── GSAP scroll animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".testimonials-title",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
      )
        .fromTo(
          ".testimonials-nav-btn",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.12, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(
          ".testimonial-video",
          { opacity: 0, x: 70, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        );
    }, sectionRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(timer); ctx.revert(); };
  }, []);

  if (!testimonials.length) {
    return (
      <section className="testimonials-main testimonials-main--empty" ref={sectionRef}>
        <div className="testimonials-section-container">
          <div className="testimonials-empty-state">
            <span className="testimonials-empty-line" aria-hidden="true" />
            <div className="testimonials-empty-inner">
              <p className="testimonials-empty-eyebrow">Client Stories</p>
              <h2 className="testimonials-empty-headline">
                <em>Voices coming soon —</em>
              </h2>
              <p className="testimonials-empty-sub">
                Real conversations about space, light, and the quieter things
                that make a built environment feel like home.
              </p>
              <a href="/contact" className="testimonials-empty-cta">
                <span>Start a conversation</span>
                <span className="testimonials-empty-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
            <span className="testimonials-empty-line" aria-hidden="true" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="testimonials-main" ref={sectionRef}>
        <div className="testimonials-section-container flex items-center justify-center">
          <div className="testimonials-section container">
            <div className="testimonials-heading-row">
              <SectionTitle
                className="testimonials-title"
                label="Documentaries"
                title="Form in Motion"
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
                <button
                  key={item._id}
                  type="button"
                  className="testimonial-video"
                  onClick={() => setActiveVideo(item)}
                  aria-label="Play testimonial video"
                >
                  {item.thumbnail?.asset?.url && (
                    <div
                      className="testimonial-video-image"
                      style={{ backgroundImage: `url(${item.thumbnail.asset.url})` }}
                    />
                  )}
                  <span className="testimonial-video-overlay" aria-hidden="true" />
                  <span className="testimonial-video-play" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoLightbox
          testimonial={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
};

export default TestimonialsSection;
