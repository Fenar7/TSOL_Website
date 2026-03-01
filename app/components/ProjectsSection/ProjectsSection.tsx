import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { projectsData } from "../../data/projects";
import "./style.scss";
const projectItems = projectsData.slice(0, 6);

const ProjectsSection = () => {
  return (
    <section className="projects-section-main" aria-label="Portfolio projects">
      <div className="projects-section-container container">
        <SectionTitle
          className="projects-section-title"
          label="Portfolio"
          title="Emotion Memory Meaning..."
        />

        <div className="projects-grid">
          {projectItems.map((project) => (
            <article key={project.id} className="projects-item">
              <div
                className="projects-item-image"
                role="img"
                aria-label={project.title}
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <h3 className="projects-item-title">{project.title}</h3>
            </article>
          ))}
        </div>

        <div className="projects-cta">
          <ActionButton href="#" variant="outline-dark" className="projects-cta-btn">
            View Portfolio
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
