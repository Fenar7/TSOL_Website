import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ProjectStatus = "Ongoing" | "Completed";

export type ProjectCategory =
    | "Residential"
    | "Commercial"
    | "Healthcare"
    | "Hospitality"
    | "Institutional"
    | "Interior"
    | "Landscape";

export interface SanityProject {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage: SanityImageSource;
    gallery?: SanityImageSource[];
    category: ProjectCategory;
    status: ProjectStatus;
    year?: number;
    areaSqft?: number;
    location?: string;
    body?: PortableTextBlock[];
}

/** Listing card — lighter payload (no body / gallery) */
export type ProjectCard = Pick<
    SanityProject,
    "_id" | "title" | "slug" | "coverImage" | "category" | "status"
>;
