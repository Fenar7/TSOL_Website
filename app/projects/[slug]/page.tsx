import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "../../lib/queries";
import ProjectDetailContent from "./ProjectDetailContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return { title: "Project Not Found — TSOL Architecture" };
    }

    return {
        title: `${project.title} — TSOL Architecture`,
        description: `${project.category?.title ?? "Architecture"} project by TSOL Architecture${project.location ? ` in ${project.location}` : ""
            }.`,
    };
}

export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map((p) => ({ slug: p.slug.current }));
}

const ProjectDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="project-detail-main">
            <ProjectDetailContent
                title={project.title}
                coverImage={project.coverImage}
                gallery={project.gallery}
                category={project.category?.title}
                status={project.status}
                year={project.year}
                areaSqft={project.areaSqft}
                location={project.location}
                body={project.body}
            />
        </main>
    );
};

export default ProjectDetailPage;
