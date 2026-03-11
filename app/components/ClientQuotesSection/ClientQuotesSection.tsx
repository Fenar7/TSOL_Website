"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

/* ── Temp static data ── */
const QUOTES = [
  {
    id: "q1",
    quote:
      "Living in this house changed how I experience every morning. The light, the quiet—it's as though the building already knew how we live.",
    name: "Ananya R.",
    role: "Homeowner",
    location: "Bengaluru",
  },
  {
    id: "q2",
    quote:
      "TSOL didn't just design our office. They shaped the feeling our team carries when they walk in each day.",
    name: "Vikram M.",
    role: "Founder",
    location: "Chennai",
  },
  {
    id: "q3",
    quote:
      "The interiors feel like they grew from within the house rather than being placed into it. That is a rare quality.",
    name: "Priya S.",
    role: "Homeowner",
    location: "Kochi",
  },
  {
    id: "q4",
    quote:
      "Every corner of our store was designed with intention. Customers notice it, and they stay longer because of it.",
    name: "Arjun T.",
    role: "Retail Owner",
    location: "Hyderabad",
  },
  {
    id: "q5",
    quote:
      "Our garden is now the heart of our home. It changes with the seasons and it always feels exactly right.",
    name: "Meera K.",
    role: "Homeowner",
    location: "Coimbatore",
  },
  {
    id: "q6",
    quote:
      "The process was as thoughtful as the result. They listened, they considered, and they built something genuinely true.",
    name: "Rajan P.",
    role: "Developer",
    location: "Bengaluru",
  },
];

const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE = 1;
const AUTO_DELAY = 5200;

const ClientQuotesSection = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible]         = useState(VISIBLE_DESKTOP);
  const maxIndex = QUOTES.length - visible;

  /* ── Responsive visible count ── */
  useEffect(() => {
    const check = () =>
      setVisible(window.innerWidth < 768 ? VISIBLE_MOBILE : VISIBLE_DESKTOP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, QUOTES.length - visible));
  }, [visible]);

  /* ── GSAP slide ── */
  const slideTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0] as HTMLElement | null;
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 28;
    gsap.to(track, {
      x: -(index * (firstCard.offsetWidth + gap)),
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, []);

  useEffect(() => {
    slideTo(activeIndex);
  }, [activeIndex, slideTo]);

  /* ── Auto-advance ── */
  const startAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setActiveIndex((i) => (i >= QUOTES.length - visible ? 0 : i + 1));
    }, AUTO_DELAY);
  }, [visible]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [startAuto]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startAuto();
  };
  const prev = () => goTo(activeIndex <= 0 ? maxIndex : activeIndex - 1);
  const next = () => goTo(activeIndex >= maxIndex ? 0 : activeIndex + 1);

  /* ────────────────────────────────────────────
     AWARD-LEVEL SCROLL ANIMATION
  ──────────────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Full motion — desktop & tablet */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "restart none none reverse",
          },
        });

        // 1 ─ Kicker lines expand from centre
        tl.fromTo(
          ".cq-section-title .section-title__kicker-line",
          { scaleX: 0, transformOrigin: "center center" },
          { scaleX: 1, duration: 0.65, stagger: 0.12, ease: "power4.inOut" }
        )

        // 2 ─ Kicker label drops in
        .fromTo(
          ".cq-section-title .section-title__kicker",
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )

        // 3 ─ Title rises dramatically with slight scale
        .fromTo(
          ".cq-section-title .section-title__title",
          { opacity: 0, y: 72, scale: 0.97, transformOrigin: "left bottom" },
          { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power4.out" },
          "-=0.3"
        )

        // 4 ─ Nav arrows glide in from right
        .fromTo(
          ".cq-nav-btn:first-child",
          { opacity: 0, x: -16 },
          { opacity: 0.8, x: 0, duration: 0.55, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".cq-nav-btn:last-child",
          { opacity: 0, x: 16 },
          { opacity: 0.8, x: 0, duration: 0.55, ease: "power3.out" },
          "<"
        )

        // 5 ─ Cards: clip-path reveal from bottom (signature style)
        .fromTo(
          ".cq-card",
          {
            clipPath: "inset(100% 0 0 0)",
            scale: 0.97,
            transformOrigin: "bottom center",
          },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.15,
            stagger: 0.16,
            ease: "power4.inOut",
          },
          "-=0.45"
        )

        // 6 ─ Quote mark pops in with overshoot
        .fromTo(
          ".cq-card-mark",
          { opacity: 0, scale: 0.25 },
          {
            opacity: 0.18,
            scale: 1,
            duration: 0.7,
            stagger: 0.16,
            ease: "back.out(2.5)",
          },
          "-=0.9"
        )

        // 7 ─ Quote text rises inside revealed card
        .fromTo(
          ".cq-card-quote",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.85"
        )

        // 8 ─ Footer divider scaleX reveal
        .fromTo(
          ".cq-card-footer",
          { scaleX: 0, transformOrigin: "left center", opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.55,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.55"
        )

        // 9 ─ Dots pop in last
        .fromTo(
          ".cq-dot",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "back.out(3)",
          },
          "-=0.3"
        );
      });

      /* Reduced motion fallback */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          [
            ".cq-section-title",
            ".cq-card",
            ".cq-nav-btn",
            ".cq-dot",
          ],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "restart none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="cq-main"
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      <div className="cq-container container">

        {/* Header row */}
        <div className="cq-header">
          <SectionTitle
            className="cq-section-title"
            label="Testimonials"
            title="Words That Stayed"
          />

          <div className="cq-nav">
            <button
              type="button"
              className="cq-nav-btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <Image
                src="/images/icons/testimonial-arrow.png"
                alt=""
                aria-hidden="true"
                className="cq-nav-icon cq-nav-icon--prev"
                height={48}
                width={48}
              />
            </button>
            <button
              type="button"
              className="cq-nav-btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <Image
                src="/images/icons/testimonial-arrow.png"
                alt=""
                aria-hidden="true"
                className="cq-nav-icon"
                height={48}
                width={48}
              />
            </button>
          </div>
        </div>

        {/* Slider viewport */}
        <div className="cq-viewport" aria-live="polite">
          <div className="cq-track" ref={trackRef}>
            {QUOTES.map((q) => (
              <article key={q.id} className="cq-card">
                <span className="cq-card-mark" aria-hidden="true">&ldquo;</span>
                <p className="cq-card-quote">{q.quote}</p>
                <footer className="cq-card-footer">
                  <p className="cq-card-name">{q.name}</p>
                  <p className="cq-card-role">
                    {q.role}&nbsp;&middot;&nbsp;{q.location}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="cq-dots" role="tablist" aria-label="Testimonial slides">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
              className={`cq-dot${i === activeIndex ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientQuotesSection;
