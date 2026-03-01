"use client";

import { useMemo, useState } from "react";
import { projectsData } from "../../data/projects";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

const PROJECTS_PER_PAGE = 12;

const ProjectsPageSection = () => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(projectsData.length / PROJECTS_PER_PAGE)
  );

  const visibleProjects = useMemo(() => {
    const start = (activePage - 1) * PROJECTS_PER_PAGE;
    return projectsData.slice(start, start + PROJECTS_PER_PAGE);
  }, [activePage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

        <div className="projects-page-grid">
          {visibleProjects.map((project) => (
            <article key={project.id} className="projects-page-item">
              <div
                className="projects-page-item-image"
                role="img"
                aria-label={project.title}
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <h3 className="projects-page-item-title">{project.title}</h3>
            </article>
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="projects-page-pagination" aria-label="Projects pagination">
            <button
              type="button"
              className="projects-page-page-btn projects-page-page-btn-nav"
              onClick={() => setActivePage((current) => Math.max(1, current - 1))}
              disabled={activePage === 1}
            >
              Previous
            </button>

            <div className="projects-page-page-list">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={`projects-page-page-btn ${
                    activePage === pageNumber ? "is-active" : ""
                  }`.trim()}
                  onClick={() => setActivePage(pageNumber)}
                  aria-current={activePage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="projects-page-page-btn projects-page-page-btn-nav"
              onClick={() =>
                setActivePage((current) => Math.min(totalPages, current + 1))
              }
              disabled={activePage === totalPages}
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectsPageSection;
