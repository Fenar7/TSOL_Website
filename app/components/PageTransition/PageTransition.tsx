"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import "./style.scss";

/**
 * PageTransition
 * ──────────────
 * Awwwards-level GSAP page transition.
 *
 * Flow:
 *   CLICK  →  dark panel slides up from below  →  router.push()
 *   NEW PAGE  →  wait 1 frame  →  panel slides off to top
 *
 * Intercepts all internal <a> clicks via event delegation so no
 * changes to existing Link components are needed.
 */
export default function PageTransition() {
    const pathname = usePathname();
    const router = useRouter();

    const panelRef = useRef<HTMLDivElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    const isAnimating = useRef(false);
    const prevPathname = useRef(pathname);

    /* ─── initial setup ─── */
    useEffect(() => {
        const el = panelRef.current;
        if (!el) return;
        gsap.set(el, { yPercent: 100 });
    }, []);

    /* ─── global click interceptor ─── */
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as Element).closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href) return;

            // Only internal same-origin routes
            if (
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("#") ||
                anchor.getAttribute("target") === "_blank"
            ) return;

            // Don't transition to current page, Sanity studio, or from Sanity studio
            const targetPath = href.split("?")[0];
            if (targetPath === pathname || targetPath === window.location.pathname) return;
            if (targetPath.startsWith("/studio")) return;
            if (window.location.pathname.startsWith("/studio")) return;

            if (isAnimating.current) return;
            isAnimating.current = true;

            e.preventDefault();

            const panel = panelRef.current;
            const wordmark = wordmarkRef.current;
            const line = lineRef.current;
            if (!panel) return;

            const tl = gsap.timeline();

            // 1 — Panel sweeps up from the bottom, covering the page
            tl.to(panel, {
                yPercent: 0,
                duration: 0.45,
                ease: "power4.inOut",
            })

                // 2 — Horizontal rule draws in from the left
                .fromTo(
                    line,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.3, ease: "power3.out", transformOrigin: "left" },
                    "-=0.1"
                )

                // 3 — Wordmark fades up
                .fromTo(
                    wordmark,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
                    "-=0.18"
                )

                // 4 — Navigate after panel is settled
                .call(() => {
                    router.push(href);
                }, [], "+=0.08");
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [pathname, router]);

    /* ─── animate-out when new page mounts ─── */
    useEffect(() => {
        if (prevPathname.current === pathname) return;
        prevPathname.current = pathname;

        // Never animate for studio routes
        if (pathname.startsWith("/studio")) {
            isAnimating.current = false;
            return;
        }

        const panel = panelRef.current;
        const wordmark = wordmarkRef.current;
        const line = lineRef.current;
        if (!panel) return;

        // Scroll to top instantly before reveal
        window.scrollTo({ top: 0, behavior: "instant" });

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false;
                // Reset below screen for next transition
                gsap.set(panel, { yPercent: 100 });
                gsap.set(wordmark, { opacity: 0, y: 14 });
                gsap.set(line, { scaleX: 0 });
            },
        });

        // Brief pause then wordmark fades out
        tl.to(wordmark, { opacity: 0, duration: 0.15, ease: "power2.in" }, "+=0.05")

            // Line erases from right
            .to(
                line,
                { scaleX: 0, duration: 0.22, ease: "power3.in", transformOrigin: "right" },
                "-=0.08"
            )

            // Panel sweeps off to the top
            .to(panel, {
                yPercent: -100,
                duration: 0.42,
                ease: "power4.inOut",
            });
    }, [pathname]);

    return (
        <div ref={panelRef} className="page-transition-panel" aria-hidden="true">
            <div className="page-transition-inner">
                <div ref={lineRef} className="page-transition-line" />
                <div ref={wordmarkRef} className="page-transition-wordmark">
                    TSOL
                </div>
            </div>
        </div>
    );
}
