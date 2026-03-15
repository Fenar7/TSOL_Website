"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { urlFor } from "@/sanity/image";
import type { ProjectCard, ServiceCategory } from "../../lib/types";
import "./style.scss";

const CATEGORIES: {
  value: ServiceCategory;
  label: string;
  imageUrl: string;
  description: string;
}[] = [
  {
    value: "architecture",
    label: "Architecture",
    imageUrl: "/images/architecture.png",
    description:
      "Design with lived experience in mind. Plans are shaped for posture, movement, rest, gathering, and openness, so the space feels clear, calm, and true to life.",
  },
  {
    value: "interiors",
    label: "Interiors",
    imageUrl: "/images/interior.png",
    description:
      "Interiors carry the soul of daily life. Proportion, material, comfort, and atmosphere are held with care, so the space feels human, grounded, and worth returning to.",
  },
  {
    value: "landscaping",
    label: "Landscaping",
    imageUrl: "/images/landscaping.png",
    description:
      "Landscape extends the space into nature. Shade, air, paths, and quiet corners are shaped to feel natural through the day, and to mature with time.",
  },
];

interface ProjectsPageSectionProps {
  projects: ProjectCard[];
  initialCategory?: ServiceCategory;
}

const ProjectsPageSection = ({
  projects,
  initialCategory,
}: ProjectsPageSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    initialCategory ?? null
  );

  const gridRef  = useRef<HTMLDivElement>(null);
  const catsRef  = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isFiltered = activeCategory !== null;
  const activeCatData = CATEGORIES.find((c) => c.value === activeCategory);
  const filtered = projects.filter(
    (p) => p.serviceCategory === activeCategory
  );

  /* ── GSAP: project cards entrance when entering filtered view ── */
  useEffect(() => {
    if (!isFiltered) return;
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".projects-page-item");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeCategory, isFiltered]);

  /* ── GSAP: category cards entrance when returning to default view ── */
  useEffect(() => {
    if (isFiltered || !catsRef.current) return;
    const cards = catsRef.current.querySelectorAll(".projects-cat-card");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,clip-path",
      }
    );
  }, [isFiltered]);

  /* ── Navigate to a category (push so browser back works) ── */
  const handleCategoryClick = (cat: ServiceCategory) => {
    setActiveCategory(cat);
    router.push(`/projects?category=${cat}`, { scroll: false });
  };

  /* ── Back to categories view ── */
  const handleBack = () => {
    setActiveCategory(null);
    router.push("/projects", { scroll: false });
  };

  return (
    <section className="projects-page-section-main" aria-label="Portfolio projects">
      <div className="projects-page-section-container container">

        {/* ── Dynamic section title ── */}
        <SectionTitle
          className="projects-page-section-title"
          label={isFiltered ? "Selected Works" : "Selected Works"}
          title={isFiltered ? (activeCatData?.label ?? "") : "Emotion Memory Meaning"}
        />

        {/* ── Back pill — only shown in filtered view ── */}
        {isFiltered && (
          <button
            type="button"
            className="projects-back-pill"
            onClick={handleBack}
            aria-label="Back to all categories"
          >
            <span className="projects-back-pill-arrow" aria-hidden="true">←</span>
            All Categories
          </button>
        )}

        {/* ── Category cards — only shown in default view ── */}
        {!isFiltered && (
          <div className="projects-cat-cards" ref={catsRef}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className="projects-cat-card"
                onClick={() => handleCategoryClick(cat.value)}
                aria-label={`Browse ${cat.label} projects`}
              >
                <div className="projects-cat-card-img-wrap">
                  <div
                    className="projects-cat-card-image"
                    role="img"
                    aria-label={cat.label}
                    style={{ backgroundImage: `url(${cat.imageUrl})` }}
                  />
                </div>
                <h3 className="projects-cat-card-title">{cat.label}</h3>
                <p className="projects-cat-card-desc">{cat.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* ── Projects grid — only shown in filtered view ── */}
        {isFiltered && (
          filtered.length > 0 ? (
            <div className="projects-page-grid" ref={gridRef}>
              {filtered.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="projects-page-item"
                >
                  <div className="projects-page-item-image-wrap">
                    <div
                      className="projects-page-item-image"
                      role="img"
                      aria-label={project.title ?? "Project image"}
                      style={{
                        backgroundImage: `url(${urlFor(project.coverImage)
                          .width(600)
                          .height(430)
                          .auto("format")
                          .url()})`,
                      }}
                    />
                  </div>
                  {project.title && (
                    <p className="projects-page-item-title">{project.title}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="projects-page-empty">
              <p>No {activeCatData?.label.toLowerCase()} projects yet. Check back soon.</p>
            </div>
          )
        )}

      </div>
    </section>
  );
};

export default ProjectsPageSection;
