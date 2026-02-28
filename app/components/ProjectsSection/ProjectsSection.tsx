import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

const projectItems = [
  {
    id: "project-1",
    imageUrl: "https://www.figma.com/api/mcp/asset/8e8e5d6d-68ce-4a73-b040-01373f20cb97",
    title: "Abdul Khader Residency",
  },
  {
    id: "project-2",
    imageUrl: "https://www.figma.com/api/mcp/asset/130392dc-74fa-429d-b824-9a7f32c1d655",
    title: "Abooty, Ucity",
  },
  {
    id: "project-3",
    imageUrl: "https://www.figma.com/api/mcp/asset/70f8632a-2cd6-4c90-9b60-0ada077a81f3",
    title: "Ahmed Shafi Residency",
  },
  {
    id: "project-4",
    imageUrl: "https://www.figma.com/api/mcp/asset/5595bd98-1017-491d-9a31-e2222c0d3cb6",
    title: "Abdul Khader Residency",
  },
  {
    id: "project-5",
    imageUrl: "https://www.figma.com/api/mcp/asset/867c2b18-fb02-4796-8de1-ef6c308c5461",
    title: "Abooty, Ucity",
  },
  {
    id: "project-6",
    imageUrl: "https://www.figma.com/api/mcp/asset/dd5d84d7-35c4-4863-af48-fe5f868453da",
    title: "Ahmed Shafi Residency",
  },
];

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
