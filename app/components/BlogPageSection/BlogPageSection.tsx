"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import { urlFor } from "@/sanity/image";
import type { BlogPostCard } from "../../lib/types";
import "./style.scss";

const POSTS_PER_PAGE = 12;

interface BlogPageSectionProps {
  posts: BlogPostCard[];
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

const BlogPageSection = ({ posts }: BlogPageSectionProps) => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const visiblePosts = useMemo(() => {
    const start = (activePage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, activePage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <section className="blog-page-section-main" aria-label="Journal articles">
      <div className="blog-page-section-container container">
        <SectionTitle
          className="blog-page-section-title"
          label="The Journal"
          title="Thoughts from the studio"
          subtitle="Ideas and lessons that help you design with less noise."
        />

        {posts.length > 0 ? (
          <>
            <div className="blog-page-grid">
              {visiblePosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="blog-page-card"
                  aria-label={`Read article: ${post.title}`}
                >
                  <div className="blog-page-card-image-wrap">
                    <div
                      className="blog-page-card-image"
                      role="img"
                      aria-label={post.title}
                      style={{
                        backgroundImage: `url(${urlFor(post.coverImage)
                          .width(600)
                          .height(430)
                          .auto("format")
                          .url()})`,
                      }}
                    />
                    <span className="blog-page-card-arrow-link" aria-hidden="true">
                      <Image
                        src="/images/icons/top-right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="blog-page-card-arrow-icon"
                      />
                    </span>
                  </div>

                  <div className="blog-page-card-content">
                    <h3 className="blog-page-card-title">
                      <span className="blog-page-card-title-link">
                        {post.title}
                      </span>
                    </h3>
                    {post.excerpt && (
                      <p className="blog-page-card-excerpt">{post.excerpt}</p>
                    )}
                    <div className="blog-page-card-date">
                      <Image
                        src="/images/icons/calendr.svg"
                        alt=""
                        width={17}
                        height={19}
                      />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 ? (
              <nav
                className="blog-page-pagination"
                aria-label="Blog pagination"
              >
                <button
                  type="button"
                  className="blog-page-page-btn blog-page-page-btn-nav"
                  onClick={() =>
                    setActivePage((current) => Math.max(1, current - 1))
                  }
                  disabled={activePage === 1}
                >
                  Previous
                </button>

                <div className="blog-page-page-list">
                  {pageNumbers.map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`blog-page-page-btn ${activePage === pageNum ? "is-active" : ""
                        }`.trim()}
                      onClick={() => setActivePage(pageNum)}
                      aria-current={
                        activePage === pageNum ? "page" : undefined
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="blog-page-page-btn blog-page-page-btn-nav"
                  onClick={() =>
                    setActivePage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  disabled={activePage === totalPages}
                >
                  Next
                </button>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="blog-page-empty">
            <div className="blog-page-empty-icon" aria-hidden="true">
              <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="14"
                  y="8"
                  width="52"
                  height="64"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="26"
                  y1="24"
                  x2="54"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="26"
                  y1="34"
                  x2="54"
                  y2="34"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="26"
                  y1="44"
                  x2="44"
                  y2="44"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="blog-page-empty-title">Articles Coming Soon</p>
            <p className="blog-page-empty-subtitle">
              We&apos;re writing thoughts from the studio.
              <br />
              Check back shortly for fresh insights.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPageSection;
