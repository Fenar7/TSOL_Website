import { client } from "@/sanity/client";
import type { ProjectCard, SanityProject } from "./types";

/* ------------------------------------------------------------------ */
/*  All projects (listing pages)                                       */
/* ------------------------------------------------------------------ */

const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    coverImage,
    category,
    status
  }
`;

export async function getAllProjects(): Promise<ProjectCard[]> {
    return client.fetch<ProjectCard[]>(ALL_PROJECTS_QUERY);
}

/* ------------------------------------------------------------------ */
/*  Homepage projects (first 6)                                        */
/* ------------------------------------------------------------------ */

const HOMEPAGE_PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    coverImage,
    category,
    status
  }
`;

export async function getHomepageProjects(): Promise<ProjectCard[]> {
    return client.fetch<ProjectCard[]>(HOMEPAGE_PROJECTS_QUERY);
}

/* ------------------------------------------------------------------ */
/*  Single project by slug                                             */
/* ------------------------------------------------------------------ */

const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    gallery,
    category,
    status,
    year,
    areaSqft,
    location,
    body
  }
`;

export async function getProjectBySlug(
    slug: string
): Promise<SanityProject | null> {
    return client.fetch<SanityProject | null>(PROJECT_BY_SLUG_QUERY, { slug });
}

/* ------------------------------------------------------------------ */
/*  Unique categories (for filter UI)                                  */
/* ------------------------------------------------------------------ */

const CATEGORIES_QUERY = `
  array::unique(*[_type == "project"].category)
`;

export async function getCategories(): Promise<string[]> {
    return client.fetch<string[]>(CATEGORIES_QUERY);
}
