import { client } from "@/sanity/client";
import type {
  ApproachItem,
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
    status,
    serviceCategory
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
    status,
    serviceCategory
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
    status,
    serviceCategory,
    body
  }
`;

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  return client.fetch<SanityProject | null>(PROJECT_BY_SLUG_QUERY, { slug });
}

/* ================================================================== */
/*  BLOG POSTS                                                         */
/* ================================================================== */

const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    "coverImage": coverImage { ..., asset-> },
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
    "coverImage": coverImage {
      ...,
      asset->
    },
    excerpt,
    date,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`;

export async function getBlogPostBySlug(
  slug: string
): Promise<SanityBlogPost | null> {
  return client.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, {
    slug,
  });
}

/* ================================================================== */
/*  TESTIMONIALS                                                        */
/* ================================================================== */

export interface SanityTestimonial {
  _id: string;
  thumbnail: {
    asset: { url: string };
  };
  video: {
    asset: { url: string; mimeType?: string };
  };
}

const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    "thumbnail": thumbnail { asset-> { url } },
    "video": video { asset-> { url, mimeType } }
  }
`;

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch<SanityTestimonial[]>(ALL_TESTIMONIALS_QUERY);
}

/* ================================================================== */
/*  SITE SETTINGS                                                      */
/* ================================================================== */

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    "heroImageUrl": heroImage.asset->url
  }
`;

export async function getHeroImageUrl(): Promise<string | null> {
  const result = await client.fetch<{ heroImageUrl?: string } | null>(SITE_SETTINGS_QUERY);
  return result?.heroImageUrl ?? null;
}

/* ================================================================== */
/*  OUR APPROACH                                                       */
/* ================================================================== */

const APPROACH_ITEMS_QUERY = `
  *[_type == "approachItem"] | order(order asc) {
    _id,
    order,
    highlightWord,
    body,
    "imageUrl": image.asset->url,
    imageAlt
  }
`;

export async function getApproachItems(): Promise<ApproachItem[]> {
  return client.fetch<ApproachItem[]>(APPROACH_ITEMS_QUERY);
}
