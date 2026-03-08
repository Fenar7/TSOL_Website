import type { PortableTextBlock } from "@portabletext/react";

// SanityImageSource — acceptable input to sanity's imageUrlBuilder
// Using a local alias avoids the unstable deep import from @sanity/image-url
type SanityImageSource = Parameters<ReturnType<typeof import("@sanity/image-url")["default"]>["image"]>[0];

/* ── Project types ── */

export type ProjectStatus = "Ongoing" | "Completed";

export interface SanityProject {
    _id: string;
    title?: string;
    slug: { current: string };
    coverImage: SanityImageSource;
    gallery?: SanityImageSource[];
    status: ProjectStatus;
    body?: PortableTextBlock[];
}

/** Listing card — lighter payload (no body / gallery) */
export type ProjectCard = Pick<
    SanityProject,
    "_id" | "title" | "slug" | "coverImage" | "status"
>;

/* ── Blog types ── */

export interface SanityBlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage: SanityImageSource;
    excerpt?: string;
    date: string;
    body?: PortableTextBlock[];
}

/** Listing card — no body */
export type BlogPostCard = Pick<
    SanityBlogPost,
    "_id" | "title" | "slug" | "coverImage" | "excerpt" | "date"
>;
