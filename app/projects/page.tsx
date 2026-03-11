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
  searchParams: Promise<{ category?: string; status?: string }>;
}

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const projects = await getAllProjects();
  const { category, status } = await searchParams;

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
      <ProjectsPageSection
        projects={projects}
        initialCategory={initialCategory}
        initialStatus={status}
      />
    </main>
  );
};

export default ProjectsPage;
