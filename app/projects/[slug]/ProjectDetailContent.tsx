"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { gsap } from "gsap";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import "./style.scss";

interface ProjectDetailContentProps {
    title: string;
    coverImage: SanityImageSource;
    gallery?: SanityImageSource[];
    category: string;
    status: string;
    year?: number;
    areaSqft?: number;
    location?: string;
    body?: PortableTextBlock[];
}

const ProjectDetailContent = ({
    title,
    coverImage,
    gallery,
    category,
    status,
    year,
    areaSqft,
    location,
    body,
}: ProjectDetailContentProps) => {
    const allImages = useMemo(() => {
        const imgs: SanityImageSource[] = [coverImage];
        if (gallery && gallery.length > 0) {
            imgs.push(...gallery);
        }
        return imgs;
    }, [coverImage, gallery]);

    const sideThumbnails = allImages.slice(1, 4);
    const remainingCount = Math.max(0, allImages.length - 4);

    /* ── Lightbox state ── */
    const [viewerOpen, setViewerOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);

    const openViewer = (index: number) => {
        setActiveIndex(index);
        setViewerOpen(true);
    };

    const closeViewer = () => {
        if (!overlayRef.current) {
            setViewerOpen(false);
            return;
        }
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setViewerOpen(false),
        });
    };

    const changeSlide = (direction: 1 | -1) => {
        if (isAnimating || !imageRef.current) return;
        setIsAnimating(true);
        const next =
            (activeIndex + direction + allImages.length) % allImages.length;

        gsap.to(imageRef.current, {
            opacity: 0,
            x: direction * -60,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(next);
                if (!imageRef.current) return;
                gsap.set(imageRef.current, { x: direction * 60 });
                gsap.to(imageRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => setIsAnimating(false),
                });
            },
        });
    };

    useLayoutEffect(() => {
        if (viewerOpen && overlayRef.current) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [viewerOpen]);

    /* Keyboard nav */
    useLayoutEffect(() => {
        if (!viewerOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeViewer();
            if (e.key === "ArrowLeft") changeSlide(-1);
            if (e.key === "ArrowRight") changeSlide(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewerOpen, activeIndex, isAnimating]);

    /* ── Meta line ── */
    const metaParts: string[] = [];
    if (year) metaParts.push(String(year));
    if (areaSqft) metaParts.push(`${areaSqft.toLocaleString()} sqft`);
    if (location) metaParts.push(location);
    if (status) metaParts.push(status);
    const metaLine = metaParts.join(" | ");

    return (
        <>
            <section className="project-detail-section">
                <div className="project-detail-container container">
                    {/* ── Gallery ── */}
                    <div className="project-gallery">
                        <button
                            type="button"
                            className="project-main-image"
                            style={{
                                backgroundImage: `url(${urlFor(coverImage)
                                    .width(1400)
                                    .height(723)
                                    .auto("format")
                                    .url()})`,
                            }}
                            onClick={() => openViewer(0)}
                            aria-label="View cover image full screen"
                        />

                        {sideThumbnails.length > 0 && (
                            <div className="project-side-thumbs">
                                {sideThumbnails.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="project-thumb-image"
                                        style={{
                                            backgroundImage: `url(${urlFor(img)
                                                .width(640)
                                                .height(460)
                                                .auto("format")
                                                .url()})`,
                                        }}
                                        onClick={() => openViewer(idx + 1)}
                                        aria-label={`View image ${idx + 2}`}
                                    >
                                        {idx === sideThumbnails.length - 1 &&
                                            remainingCount > 0 && (
                                                <span className="project-thumb-count">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                    >
                                                        <rect
                                                            x="1"
                                                            y="4"
                                                            width="14"
                                                            height="12"
                                                            rx="2"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        />
                                                        <rect
                                                            x="5"
                                                            y="1"
                                                            width="14"
                                                            height="12"
                                                            rx="2"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        />
                                                    </svg>
                                                    +{remainingCount}
                                                </span>
                                            )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Heading ── */}
                    <div className="project-heading">
                        <div className="project-kicker-row">
                            <span className="project-kicker-line" aria-hidden="true" />
                            <p className="project-kicker">{category}</p>
                        </div>
                        <h1 className="project-title">{title}</h1>
                        {metaLine && <p className="project-meta">{metaLine}</p>}
                    </div>

                    {/* ── Body ── */}
                    {body && body.length > 0 && (
                        <div className="project-description">
                            <PortableText value={body} />
                        </div>
                    )}

                    {/* ── Full gallery grid ── */}
                    {allImages.length > 4 && (
                        <div className="project-full-gallery">
                            {allImages.slice(4).map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className="project-full-gallery-image"
                                    style={{
                                        backgroundImage: `url(${urlFor(img)
                                            .width(800)
                                            .height(570)
                                            .auto("format")
                                            .url()})`,
                                    }}
                                    onClick={() => openViewer(idx + 4)}
                                    aria-label={`View gallery image ${idx + 5}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* ── Back link ── */}
                    <div className="project-back">
                        <Link href="/projects" className="project-back-link">
                            ← Back to Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Lightbox viewer ── */}
            {viewerOpen && (
                <div
                    className="project-viewer-overlay"
                    ref={overlayRef}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeViewer();
                    }}
                    role="dialog"
                    aria-label="Image viewer"
                >
                    <div className="project-viewer-panel">
                        <button
                            type="button"
                            className="project-viewer-close"
                            onClick={closeViewer}
                            aria-label="Close viewer"
                        >
                            ×
                        </button>

                        {allImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="project-viewer-nav project-viewer-nav-prev"
                                    onClick={() => changeSlide(-1)}
                                    aria-label="Previous image"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    className="project-viewer-nav project-viewer-nav-next"
                                    onClick={() => changeSlide(1)}
                                    aria-label="Next image"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        <div className="project-viewer-image-wrap">
                            <div
                                ref={imageRef}
                                className="project-viewer-image"
                                style={{
                                    backgroundImage: `url(${urlFor(allImages[activeIndex])
                                        .width(1500)
                                        .auto("format")
                                        .url()})`,
                                }}
                            />
                        </div>

                        {allImages.length > 1 && (
                            <p className="project-viewer-counter">
                                {activeIndex + 1} / {allImages.length}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectDetailContent;
