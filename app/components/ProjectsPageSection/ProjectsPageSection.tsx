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
      "We design with lived experience in mind. Plans are shaped for posture, movement, rest, gathering, and openness, so the space feels clear, calm, and true to life.",
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

  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ── Derive filtered list ── */
  const filtered = projects.filter(
    (p) => !activeCategory || p.serviceCategory === activeCategory
  );

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
  }, [filtered.length, activeCategory]);

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

        {/* ── Category filter cards — same design as service cards ── */}
        <div className="projects-cat-cards">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                className={`projects-cat-card${isActive ? " is-active" : ""}`}
                onClick={() => handleCategoryClick(isActive ? null : cat.value)}
                aria-pressed={isActive}
                aria-label={`Filter by ${cat.label}`}
              >
                {/* Image wrap — same aspect ratio + overflow as service card */}
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
            );
          })}
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
              </Link>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-page-empty">
            <p>No projects have been added yet. Check back soon.</p>
          </div>
        ) : (
          <div className="projects-page-empty">
            <p>No projects match the selected category.</p>
            <button
              type="button"
              className="projects-page-clear-btn"
              onClick={() => handleCategoryClick(null)}
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPageSection;
