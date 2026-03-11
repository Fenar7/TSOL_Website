import ProjectsPageSection from "../components/ProjectsPageSection/ProjectsPageSection";
import { getAllProjects } from "../lib/queries";
import type { ServiceCategory } from "../lib/types";
import "./style.scss";

export const metadata = {
  title: "Portfolio — TSOL Architecture",
  description:
    "Explore the full portfolio of TSOL Architecture — residential, commercial, and institutional projects shaped by life.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string }>;
}

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const projects = await getAllProjects();
  const { category } = await searchParams;

  const validCategories: ServiceCategory[] = [
    "architecture",
    "interiors",
    "landscaping",
  ];
  const initialCategory =
    validCategories.includes(category as ServiceCategory)
      ? (category as ServiceCategory)
      : undefined;

  return (
    <main className="projects-page-main">
      <ProjectsPageSection projects={projects} initialCategory={initialCategory} />
    </main>
  );
};

export default ProjectsPage;
