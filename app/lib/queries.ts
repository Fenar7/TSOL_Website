import { client } from "@/sanity/client";
import type {
  BlogPostCard,
  ProjectCard,
  SanityBlogPost,
  SanityProject,
} from "./types";

/* ================================================================== */
/*  PROJECTS                                                           */
/* ================================================================== */

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

const CATEGORIES_QUERY = `
  array::unique(*[_type == "project"].category)
`;

export async function getCategories(): Promise<string[]> {
  return client.fetch<string[]>(CATEGORIES_QUERY);
}

/* ================================================================== */
/*  BLOG POSTS                                                         */
/* ================================================================== */

const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    date
  }
`;

export async function getAllBlogPosts(): Promise<BlogPostCard[]> {
  return client.fetch<BlogPostCard[]>(ALL_BLOG_POSTS_QUERY);
}

const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    date,
    body
  }
`;

export async function getBlogPostBySlug(
  slug: string
): Promise<SanityBlogPost | null> {
  return client.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, {
    slug,
  });
}
