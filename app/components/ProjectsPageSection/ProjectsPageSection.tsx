"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { urlFor } from "@/sanity/image";
import type { ProjectCard } from "../../lib/types";
import "./style.scss";

interface ProjectsPageSectionProps {
  projects: ProjectCard[];
}

const ProjectsPageSection = ({ projects }: ProjectsPageSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !projects.length) return;

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
  }, [projects.length]);

  return (
    <section className="projects-page-section-main" aria-label="All portfolio projects">
      <div className="projects-page-section-container container">
        <SectionTitle
          className="projects-page-section-title"
          label="Selected Works"
          title="Emotion Memory Meaning..."
        />

        {projects.length > 0 ? (
          <div className="projects-page-grid" ref={gridRef}>
            {projects.map((project) => (
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
              </Link>
            ))}
          </div>
        ) : (
          <div className="projects-page-empty">
            <div className="projects-page-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <circle cx="40" cy="56" r="6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="projects-page-empty-title">Exciting Projects Coming Soon</p>
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
