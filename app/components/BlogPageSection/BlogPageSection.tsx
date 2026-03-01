"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPostsData } from "../../data/blog-posts";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

const POSTS_PER_PAGE = 12;

const BlogPageSection = () => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(blogPostsData.length / POSTS_PER_PAGE));

  const visiblePosts = useMemo(() => {
    const start = (activePage - 1) * POSTS_PER_PAGE;
    return blogPostsData.slice(start, start + POSTS_PER_PAGE);
  }, [activePage]);

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

        <div className="blog-page-grid">
          {visiblePosts.map((post) => (
            <article key={post.id} className="blog-page-card">
              <div className="blog-page-card-image-wrap">
                <div
                  className="blog-page-card-image"
                  role="img"
                  aria-label={post.title}
                  style={{ backgroundImage: `url(${post.imageSrc})` }}
                />

                <Link
                  href="#"
                  className="blog-page-card-arrow-link"
                  aria-label={`Read article: ${post.title}`}
                >
                  <Image
                    src="/images/icons/top-right-arrow.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="blog-page-card-arrow-icon"
                  />
                </Link>
              </div>

              <div className="blog-page-card-content">
                <h3 className="blog-page-card-title">{post.title}</h3>
                <p className="blog-page-card-excerpt">{post.excerpt}</p>

                <div className="blog-page-card-date">
                  <Image
                    src="/images/icons/calendr.svg"
                    alt=""
                    width={17}
                    height={19}
                  />
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="blog-page-pagination" aria-label="Blog pagination">
            <button
              type="button"
              className="blog-page-page-btn blog-page-page-btn-nav"
              onClick={() => setActivePage((current) => Math.max(1, current - 1))}
              disabled={activePage === 1}
            >
              Previous
            </button>

            <div className="blog-page-page-list">
              {pageNumbers.map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`blog-page-page-btn ${
                    activePage === pageNum ? "is-active" : ""
                  }`.trim()}
                  onClick={() => setActivePage(pageNum)}
                  aria-current={activePage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="blog-page-page-btn blog-page-page-btn-nav"
              onClick={() =>
                setActivePage((current) => Math.min(totalPages, current + 1))
              }
              disabled={activePage === totalPages}
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
};

export default BlogPageSection;
