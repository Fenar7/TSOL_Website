"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import "./style.scss";

interface BlogDetailContentProps {
    title: string;
    date: string;
    coverImage: unknown;
    body?: PortableTextBlock[];
}

function formatDisplayDate(raw: string): string {
    const d = new Date(raw);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day} · ${month} · ${year}`;
}

/** Custom PortableText components to handle inline images */
const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null;
            const imageUrl = urlFor(value).width(1200).auto("format").url();
            return (
                <figure className="blog-detail-inline-figure">
                    <Image
                        src={imageUrl}
                        alt={value.alt ?? ""}
                        width={1200}
                        height={675}
                        className="blog-detail-inline-image"
                        sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1180px) calc(100vw - 40px), 820px"
                    />
                    {value.caption && (
                        <figcaption className="blog-detail-inline-caption">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

const BlogDetailContent = ({
    title,
    date,
    coverImage,
    body,
}: BlogDetailContentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coverUrl = urlFor(coverImage as any)
        .width(1720)
        .height(680)
        .auto("format")
        .url();

    return (
        <section className="blog-detail-section">
            <div className="blog-detail-container container">
                {/* ── Cover image ── */}
                <div className="blog-detail-cover">
                    <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        priority
                        className="blog-detail-cover-image"
                        sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
                    />
                </div>

                {/* ── Header ── */}
                <header className="blog-detail-header">
                    <h1 className="blog-detail-title">{title}</h1>
                    <p className="blog-detail-date">{formatDisplayDate(date)}</p>
                </header>

                {/* ── Body ── */}
                {body && body.length > 0 && (
                    <article className="blog-detail-body">
                        <PortableText value={body} components={portableTextComponents} />
                    </article>
                )}
            </div>
        </section>
    );
};

export default BlogDetailContent;
