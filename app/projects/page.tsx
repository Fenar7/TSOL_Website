import ProjectsPageSection from "../components/ProjectsPageSection/ProjectsPageSection";
import { getAllProjects, getCategories } from "../lib/queries";
import "./style.scss";

export const metadata = {
  title: "Portfolio — TSOL Architecture",
  description:
    "Explore the full portfolio of TSOL Architecture — residential, commercial, and institutional projects shaped by life.",
};

const ProjectsPage = async () => {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getCategories(),
  ]);

  return (
    <main className="projects-page-main">
      <ProjectsPageSection projects={projects} categories={categories} />
    </main>
  );
};

export default ProjectsPage;
