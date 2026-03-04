"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * GlobalHoverEffects
 * ──────────────────
 * Mounts once at root level (inside RootLayout) and wires up
 * Awwwards-level GSAP hover effects across every interactive
 * element on the site via event delegation.
 *
 * All effects are cleaned up properly in the useEffect return.
 */
export default function GlobalHoverEffects() {
    useEffect(() => {
        const cleanups: (() => void)[] = [];

        /* ───────────────────────────────────────────────
         * Helper: bind mouseenter + mouseleave to a selector
         * ─────────────────────────────────────────────── */
        const bind = (
            selector: string,
            onEnter: (el: Element) => void,
            onLeave: (el: Element) => void,
            delegate: Element | Document = document
        ) => {
            const handleEnter = (e: Event) => {
                const target = (e.target as Element).closest(selector);
                if (target) onEnter(target);
            };
            const handleLeave = (e: Event) => {
                const target = (e.target as Element).closest(selector);
                if (target) onLeave(target);
            };
            delegate.addEventListener("mouseenter", handleEnter, true);
            delegate.addEventListener("mouseleave", handleLeave, true);
            cleanups.push(() => {
                delegate.removeEventListener("mouseenter", handleEnter, true);
                delegate.removeEventListener("mouseleave", handleLeave, true);
            });
        };

        /* ═══════════════════════════════════════════════
         * 1. ACTION BUTTONS — magnetic lift + underlay slide
         * ═══════════════════════════════════════════════ */
        bind(
            ".action-button",
            (el) => {
                gsap.to(el, {
                    y: -3,
                    scale: 1.03,
                    duration: 0.35,
                    ease: "power2.out",
                });
            },
            (el) => {
                gsap.to(el, {
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "elastic.out(1, 0.5)",
                });
            }
        );

        /* ═══════════════════════════════════════════════
         * 2. NAV LINKS — subtle underline grow
         * ═══════════════════════════════════════════════ */
        bind(
            ".nav-link",
            (el) => {
                gsap.to(el, { opacity: 0.65, y: -1, duration: 0.2, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 3. HOMEPAGE PROJECT CARDS (.projects-item)
         *    — Image zooms inside the card (card stays still)
         * ═══════════════════════════════════════════════ */
        bind(
            ".projects-item",
            (el) => {
                const img = el.querySelector(".projects-item-image");
                if (img) gsap.to(img, { scale: 1.07, duration: 0.55, ease: "power2.out" });
            },
            (el) => {
                const img = el.querySelector(".projects-item-image");
                if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.inOut" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 4. PORTFOLIO PAGE CARDS (.projects-page-item)
         *    — Image zooms inside (card stays still)
         *    No card movement — CSS already handles title colour
         * ═══════════════════════════════════════════════ */
        bind(
            ".projects-page-item",
            (el) => {
                const img = el.querySelector(".projects-page-item-image");
                if (img) gsap.to(img, { scale: 1.07, duration: 0.55, ease: "power2.out" });
            },
            (el) => {
                const img = el.querySelector(".projects-page-item-image");
                if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.inOut" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 5. BLOG CARDS (.blog-page-card)
         *    — Image zooms, arrow icon shoots diagonally
         * ═══════════════════════════════════════════════ */
        bind(
            ".blog-page-card",
            (el) => {
                gsap.to(el, { y: -6, duration: 0.35, ease: "power2.out" });
                const img = el.querySelector(".blog-page-card-image");
                if (img) gsap.to(img, { scale: 1.08, duration: 0.55, ease: "power2.out" });
                const arrow = el.querySelector(".blog-page-card-arrow-icon");
                if (arrow) gsap.to(arrow, { x: 4, y: -4, scale: 1.15, duration: 0.3, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
                const img = el.querySelector(".blog-page-card-image");
                if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
                const arrow = el.querySelector(".blog-page-card-arrow-icon");
                if (arrow) gsap.to(arrow, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 6. SERVICE CARDS (.service-item)
         *    — Card lifts, image zooms, title colour nudge
         * ═══════════════════════════════════════════════ */
        bind(
            ".service-item",
            (el) => {
                gsap.to(el, { y: -6, duration: 0.35, ease: "power2.out" });
                const img = el.querySelector(".service-item-image");
                if (img) gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power2.out" });
                const title = el.querySelector(".service-item-title");
                if (title) gsap.to(title, { x: 4, duration: 0.3, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
                const img = el.querySelector(".service-item-image");
                if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
                const title = el.querySelector(".service-item-title");
                if (title) gsap.to(title, { x: 0, duration: 0.35, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 7. CONTACT INFO CARDS (.contact-info-card)
         *    — Card lifts, icon pops with scale bounce
         * ═══════════════════════════════════════════════ */
        bind(
            ".contact-info-card",
            (el) => {
                gsap.to(el, { y: -5, duration: 0.35, ease: "power2.out" });
                const icon = el.querySelector(".contact-info-icon");
                if (icon) gsap.to(icon, { scale: 1.2, rotation: -8, duration: 0.3, ease: "back.out(2)" });
            },
            (el) => {
                gsap.to(el, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
                const icon = el.querySelector(".contact-info-icon");
                if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.35, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 8. TESTIMONIAL VIDEO CARDS (.testimonial-video)
         *    — Scale up + play icon expands
         * ═══════════════════════════════════════════════ */
        bind(
            ".testimonial-video",
            (el) => {
                gsap.to(el, { scale: 1.03, duration: 0.4, ease: "power2.out" });
                const play = el.querySelector(".testimonial-video-play");
                if (play) gsap.to(play, { scale: 1.4, duration: 0.35, ease: "back.out(2)" });
            },
            (el) => {
                gsap.to(el, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
                const play = el.querySelector(".testimonial-video-play");
                if (play) gsap.to(play, { scale: 1, duration: 0.35, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 9. ABOUT "KNOW MORE" LINK
         * ═══════════════════════════════════════════════ */
        bind(
            ".about-know-more",
            (el) => {
                gsap.to(el, { x: 6, duration: 0.3, ease: "power2.out" });
                const arrow = el.querySelector(".about-know-arrow");
                if (arrow) gsap.to(arrow, { x: 3, y: -3, duration: 0.25, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.6)" });
                const arrow = el.querySelector(".about-know-arrow");
                if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 10. TESTIMONIALS NAV ARROWS
         * ═══════════════════════════════════════════════ */
        bind(
            ".testimonials-nav-btn",
            (el) => {
                gsap.to(el, { scale: 1.12, duration: 0.25, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 11. FOOTER NAV LINKS
         * ═══════════════════════════════════════════════ */
        bind(
            ".footer-links-list a",
            (el) => {
                gsap.to(el, { x: 5, opacity: 0.7, duration: 0.2, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
            }
        );

        /* ═══════════════════════════════════════════════
         * 12. FOOTER SOCIAL ICONS
         * ═══════════════════════════════════════════════ */
        bind(
            ".footer-social-link",
            (el) => {
                gsap.to(el, { y: -4, scale: 1.15, duration: 0.25, ease: "power2.out" });
            },
            (el) => {
                gsap.to(el, { y: 0, scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" });
            }
        );

        return () => {
            cleanups.forEach((fn) => fn());
        };
    }, []);

    return null; // renders nothing — purely behavioural
}
