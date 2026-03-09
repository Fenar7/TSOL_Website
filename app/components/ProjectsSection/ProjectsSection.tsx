import Link from "next/link";
import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { getHomepageProjects } from "../../lib/queries";
import { urlFor } from "@/sanity/image";
import "./style.scss";

const ProjectsSection = async () => {
  const projects = await getHomepageProjects();

  return (
    <section className="projects-section-main" aria-label="Portfolio projects">
      <div className="projects-section-container container">
        <SectionTitle
          className="projects-section-title"
          label="Portfolio"
          title="Emotion Memory Meaning"
        />

        {projects.length > 0 ? (
          <>
            <div className="projects-grid">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="projects-item"
                >
                  <div
                    className="projects-item-image"
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
                </Link>
              ))}
            </div>

            <div className="projects-cta">
              <ActionButton
                href="/projects"
                variant="outline-dark"
                className="projects-cta-btn"
              >
                View Portfolio
              </ActionButton>
            </div>
          </>
        ) : (
          <div className="projects-empty">
            <div className="projects-empty-icon" aria-hidden="true">
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
                <circle cx="40" cy="56" r="6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="projects-empty-title">
              Exciting Projects Coming Soon
            </p>
            <p className="projects-empty-subtitle">
              We&apos;re curating our finest work. Stay tuned.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
