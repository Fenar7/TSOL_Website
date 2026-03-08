import ProjectsPageSection from "../components/ProjectsPageSection/ProjectsPageSection";
import { getAllProjects } from "../lib/queries";
import "./style.scss";

export const metadata = {
  title: "Portfolio — TSOL Architecture",
  description:
    "Explore the full portfolio of TSOL Architecture — residential, commercial, and institutional projects shaped by life.",
};

const ProjectsPage = async () => {
  const projects = await getAllProjects();

  return (
    <main className="projects-page-main">
      <ProjectsPageSection projects={projects} />
    </main>
  );
};

export default ProjectsPage;
