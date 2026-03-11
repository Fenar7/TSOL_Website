"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { urlFor } from "@/sanity/image";
import type { ProjectCard, ServiceCategory } from "../../lib/types";
import "./style.scss";

/* ── Category config ── */
const CATEGORIES: {
  value: ServiceCategory;
  label: string;
  imageUrl: string;
}[] = [
  {
    value: "architecture",
    label: "Architecture",
    imageUrl: "/images/architecture.png",
  },
  {
    value: "interiors",
    label: "Interiors",
    imageUrl: "/images/interior.png",
  },
  {
    value: "landscaping",
    label: "Landscaping",
    imageUrl: "/images/landscaping.png",
  },
];

const STATUS_FILTERS = ["All", "Ongoing", "Completed"];

interface ProjectsPageSectionProps {
  projects: ProjectCard[];
  initialCategory?: ServiceCategory;
  initialStatus?: string;
}

const ProjectsPageSection = ({
  projects,
  initialCategory,
  initialStatus,
}: ProjectsPageSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    initialCategory ?? null
  );
  const [activeStatus, setActiveStatus] = useState<string>(
    initialStatus && STATUS_FILTERS.includes(initialStatus)
      ? initialStatus
      : "All"
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ── Derive filtered list ── */
  const filtered = projects.filter((p) => {
    const catMatch = !activeCategory || p.serviceCategory === activeCategory;
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    return catMatch && statusMatch;
  });

  /* ── GSAP card entrance on filter change ── */
  useEffect(() => {
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
  }, [filtered.length, activeCategory, activeStatus]);

  /* ── Sync URL when category changes ── */
  const handleCategoryClick = (cat: ServiceCategory | null) => {
    setActiveCategory(cat);
    const url = cat ? `/projects?category=${cat}` : "/projects";
    router.replace(url, { scroll: false });
  };

  return (
    <section className="projects-page-section-main" aria-label="All portfolio projects">
      <div className="projects-page-section-container container">
        <SectionTitle
          className="projects-page-section-title"
          label="Selected Works"
          title="Emotion Memory Meaning"
        />

        {/* ── Category image-card filters ── */}
        <div className="projects-cat-cards">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                className={`projects-cat-card${isActive ? " is-active" : ""}`}
                onClick={() =>
                  handleCategoryClick(isActive ? null : cat.value)
                }
                aria-pressed={isActive}
                aria-label={`Filter by ${cat.label}`}
              >
                <div
                  className="projects-cat-card-image"
                  role="img"
                  aria-label={cat.label}
                  style={{ backgroundImage: `url(${cat.imageUrl})` }}
                />
                <div className="projects-cat-card-overlay" />
                <span className="projects-cat-card-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Status filter pills ── */}
        <div className="projects-page-filters">
          <div className="projects-page-filter-group">
            <span className="projects-page-filter-label">Status</span>
            <div className="projects-page-filter-pills">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`projects-page-filter-pill${activeStatus === s ? " is-active" : ""}`}
                  onClick={() => setActiveStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {(activeCategory || activeStatus !== "All") && (
            <button
              type="button"
              className="projects-page-clear-btn"
              onClick={() => {
                setActiveStatus("All");
                handleCategoryClick(null);
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Project grid ── */}
        {filtered.length > 0 ? (
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
                {project.status && (
                  <span className="projects-page-item-category">
                    {project.status}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-page-empty">
            <p>No projects have been added yet. Check back soon.</p>
          </div>
        ) : (
          <div className="projects-page-empty">
            <p>No projects match the current filters.</p>
            <button
              type="button"
              className="projects-page-clear-btn"
              onClick={() => {
                setActiveStatus("All");
                handleCategoryClick(null);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPageSection;
