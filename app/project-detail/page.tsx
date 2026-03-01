"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.scss";

const mainProjectImage =
  "https://www.figma.com/api/mcp/asset/d7bdd23a-c8a3-4870-9da0-cb3c3d97553c";
const thumbProjectImage =
  "https://www.figma.com/api/mcp/asset/dd73d1b1-fa73-4822-b80a-4da7e052d4ec";

const galleryImages = Array.from({ length: 24 }, (_, index) =>
  index % 4 === 0 ? mainProjectImage : thumbProjectImage
);

const sideThumbnails = [thumbProjectImage, thumbProjectImage, thumbProjectImage];

const ProjectDetailPage = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const viewerPanelRef = useRef<HTMLDivElement | null>(null);
  const viewerSlideRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);
  const isSlidingRef = useRef(false);

  const activeImageUrl = useMemo(
    () => galleryImages[activeImageIndex],
    [activeImageIndex]
  );

  const openViewer = (index: number) => {
    setActiveImageIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    if (isClosingRef.current || !overlayRef.current || !viewerPanelRef.current) {
      setViewerOpen(false);
      return;
    }

    isClosingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        setViewerOpen(false);
      },
    });

    tl.to(viewerPanelRef.current, {
      opacity: 0,
      scale: 0.965,
      y: 24,
      duration: 0.24,
      ease: "power2.inOut",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.24,
        ease: "power2.inOut",
      },
      0
    );
  };

  const changeSlide = (direction: 1 | -1) => {
    if (!viewerSlideRef.current || isSlidingRef.current) {
      return;
    }

    isSlidingRef.current = true;

    gsap.to(viewerSlideRef.current, {
      opacity: 0,
      x: direction === 1 ? -80 : 80,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveImageIndex((previous) => {
          const nextIndex =
            (previous + direction + galleryImages.length) % galleryImages.length;
          return nextIndex;
        });

        requestAnimationFrame(() => {
          if (!viewerSlideRef.current) {
            isSlidingRef.current = false;
            return;
          }

          gsap.fromTo(
            viewerSlideRef.current,
            {
              opacity: 0,
              x: direction === 1 ? 80 : -80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.32,
              ease: "power3.out",
              onComplete: () => {
                isSlidingRef.current = false;
              },
            }
          );
        });
      },
    });
  };

  useLayoutEffect(() => {
    if (!viewerOpen || !overlayRef.current || !viewerPanelRef.current) {
      return;
    }

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(viewerPanelRef.current, { opacity: 0, scale: 0.965, y: 24 });

    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.28,
      ease: "power2.out",
    }).to(
      viewerPanelRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      },
      0.04
    );
  }, [viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      } else if (event.key === "ArrowRight") {
        changeSlide(1);
      } else if (event.key === "ArrowLeft") {
        changeSlide(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [viewerOpen]);

  return (
    <main className="project-detail-main">
      <section className="project-detail-section" aria-label="Project detail">
        <div className="project-detail-container container">
          <div className="project-gallery">
            <button
              type="button"
              className="project-main-image"
              aria-label="Open image gallery"
              onClick={() => openViewer(0)}
              style={{ backgroundImage: `url(${mainProjectImage})` }}
            />

            <div className="project-side-thumbs">
              {sideThumbnails.map((thumbUrl, index) => (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  className="project-thumb-image"
                  aria-label={`Open gallery image ${index + 2}`}
                  onClick={() => openViewer(index + 1)}
                  style={{ backgroundImage: `url(${thumbUrl})` }}
                >
                  {index === sideThumbnails.length - 1 ? (
                    <span className="project-thumb-count" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M8.4 4a1.2 1.2 0 0 1 2.4 0v1.2h2.4V4a1.2 1.2 0 0 1 2.4 0v1.2h1.2A3.2 3.2 0 0 1 20 8.4v9.2a3.2 3.2 0 0 1-3.2 3.2H7.2A3.2 3.2 0 0 1 4 17.6V8.4a3.2 3.2 0 0 1 3.2-3.2h1.2V4Zm8.4 5.6H7.2c-.53 0-.96.43-.96.96v7.04c0 .53.43.96.96.96h9.6c.53 0 .96-.43.96-.96v-7.04c0-.53-.43-.96-.96-.96ZM12 11.2a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{galleryImages.length}</span>
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="project-heading">
            <div className="project-kicker-row">
              <span className="project-kicker-line" aria-hidden="true" />
              <p className="project-kicker">Residence</p>
            </div>

            <h1 className="project-title">Abdul Khader Residency</h1>
            <p className="project-meta">2020 | 2350 sqft | Kasargod | Completed</p>
          </div>

          <div className="project-description">
            <p>
              A space can be “bright” and still feel uncomfortable.
              <br />
              It can have huge windows and still feel harsh, exposed, and tiring.
            </p>

            <p>
              That’s because light isn’t just a feature. It is a daily experience. It
              changes by the hour. It changes by season. And it quietly decides
              whether a place feels calm or chaotic.
            </p>

            <p>
              When we say “light that behaves,” we mean this.
              <br />
              Light that supports the life inside the building, instead of forcing
              people to work around it.
            </p>

            <p>The difference between good light and impressive light</p>
            <p>
              Impressive light is easy to sell. Big glazing. Dramatic sun patches.
              Bright interiors.
            </p>
            <p>
              Good light is quieter. You don’t notice it as “design.” You just feel
              that the space is easy to be in. Your eyes relax. Your body slows down.
              The room feels settled.
            </p>
            <p>
              This is where the soul of a space often comes from. Not decoration. Not
              statements. Just comfort you can feel.
            </p>
            <p>Start with the day, not the window</p>
            <p>
              Instead of asking “How big should this opening be?” start with questions
              like:
            </p>

            <ul>
              <li>Where do you want the calmest light in the morning</li>
              <li>Where do you need steady light during work hours</li>
              <li>Which rooms should feel sheltered in the afternoon</li>
              <li>Where do you want soft evening light</li>
            </ul>

            <p>When you map the day, window decisions become obvious.</p>
            <p>What makes light feel uncomfortable</p>
            <p>
              Here are the most common reasons a space feels wrong even when it looks
              “modern”:
            </p>
            <p>1) Glare</p>
            <p>
              Glare is not brightness. Glare is contrast. A bright opening in a darker
              room forces your eyes to constantly adjust. You feel it as irritation and
              fatigue.
            </p>
            <p>2) Heat that follows light</p>
            <p>
              In warm climates, sunlight often brings heat, and heat changes how a
              space is used. If the living room becomes an oven at 2pm, people stop
              using it. The plan fails, even if it photographs well.
            </p>
          </div>
        </div>
      </section>

      {viewerOpen ? (
        <div
          ref={overlayRef}
          className="project-viewer-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeViewer();
            }
          }}
        >
          <div
            ref={viewerPanelRef}
            className="project-viewer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Project image gallery"
          >
            <button
              type="button"
              className="project-viewer-close"
              onClick={closeViewer}
              aria-label="Close gallery"
            >
              ×
            </button>

            <button
              type="button"
              className="project-viewer-nav project-viewer-nav-prev"
              aria-label="Previous image"
              onClick={() => changeSlide(-1)}
            >
              ‹
            </button>

            <div className="project-viewer-image-wrap">
              <div
                ref={viewerSlideRef}
                className="project-viewer-image"
                style={{ backgroundImage: `url(${activeImageUrl})` }}
              />
            </div>

            <button
              type="button"
              className="project-viewer-nav project-viewer-nav-next"
              aria-label="Next image"
              onClick={() => changeSlide(1)}
            >
              ›
            </button>

            <p className="project-viewer-counter">
              {activeImageIndex + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default ProjectDetailPage;
