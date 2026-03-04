"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { urlFor } from "@/sanity/image";
import type { ProjectCard } from "../../lib/types";
import type { SanityCategory } from "../../lib/queries";
import "./style.scss";

interface ProjectsPageSectionProps {
  projects: ProjectCard[];
  categories: SanityCategory[];
}

const ProjectsPageSection = ({
  projects,
  categories,
}: ProjectsPageSectionProps) => {
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch =
        activeStatus === "All" || project.status === activeStatus;
      const categoryMatch =
        activeCategory === "All" || project.category?._id === activeCategory;
      return statusMatch && categoryMatch;
    });
  }, [projects, activeStatus, activeCategory]);

  /* ── Filter switch GSAP animation ── */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, [filteredProjects]);

  const statusFilters = ["All", "Ongoing", "Completed"];

  const clearFilters = () => {
    setActiveStatus("All");
    setActiveCategory("All");
  };

  const hasActiveFilters = activeStatus !== "All" || activeCategory !== "All";

  return (
    <section
      className="projects-page-section-main"
      aria-label="All portfolio projects"
    >
      <div className="projects-page-section-container container">
        <SectionTitle
          className="projects-page-section-title"
          label="Portfolio"
          title="Emotion Memory Meaning..."
        />

        {/* ── Filters ── */}
        {projects.length > 0 && (
          <div className="projects-page-filters">
            <div className="projects-page-filter-group">
              <span className="projects-page-filter-label">Status</span>
              <div className="projects-page-filter-pills">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`projects-page-filter-pill ${activeStatus === status ? "is-active" : ""
                      }`.trim()}
                    onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {categories.length > 0 && (
              <div className="projects-page-filter-group">
                <span className="projects-page-filter-label">Category</span>
                <div className="projects-page-filter-pills">
                  <button
                    type="button"
                    className={`projects-page-filter-pill ${activeCategory === "All" ? "is-active" : ""
                      }`.trim()}
                    onClick={() => setActiveCategory("All")}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      type="button"
                      className={`projects-page-filter-pill ${activeCategory === cat._id ? "is-active" : ""
                        }`.trim()}
                      onClick={() => setActiveCategory(cat._id)}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <button
                type="button"
                className="projects-page-clear-btn"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── Grid ── */}
        {filteredProjects.length > 0 ? (
          <div className="projects-page-grid" ref={gridRef}>
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="projects-page-item"
              >
                <div className="projects-page-item-image-wrap">
                  <div
                    className="projects-page-item-image"
                    role="img"
                    aria-label={project.title}
                    style={{
                      backgroundImage: `url(${urlFor(project.coverImage)
                        .width(600)
                        .height(430)
                        .auto("format")
                        .url()})`,
                    }}
                  />
                  <span
                    className={`projects-page-item-badge ${project.status === "Ongoing"
                      ? "is-ongoing"
                      : "is-completed"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="projects-page-item-info">
                  <h3 className="projects-page-item-title">{project.title}</h3>
                  <span className="projects-page-item-category">
                    {project.category?.title ?? ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : projects.length > 0 ? (
          /* Filters active but no match */
          <div className="projects-page-empty">
            <div className="projects-page-empty-icon" aria-hidden="true">
              <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="34"
                  cy="34"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="50"
                  x2="68"
                  y2="68"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="projects-page-empty-title">No projects found</p>
            <p className="projects-page-empty-subtitle">
              Try adjusting the filters to see more work.
            </p>
            <button
              type="button"
              className="projects-page-empty-clear"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          /* Truly no projects in Sanity */
          <div className="projects-page-empty">
            <div className="projects-page-empty-icon" aria-hidden="true">
              <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="10"
                  y="28"
                  width="60"
                  height="42"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 28V16a2 2 0 012-2h36a2 2 0 012 2v12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="10"
                  y1="46"
                  x2="70"
                  y2="46"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="40"
                  cy="56"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="projects-page-empty-title">
              Exciting Projects Coming Soon
            </p>
            <p className="projects-page-empty-subtitle">
              We&apos;re curating our finest architectural work.
              <br />
              Check back shortly for an inspiring collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPageSection;
