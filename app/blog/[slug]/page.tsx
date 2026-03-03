import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "../../lib/queries";
import BlogDetailContent from "./BlogDetailContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return { title: "Article Not Found — TSOL Architecture" };
    }

    return {
        title: `${post.title} — TSOL Journal`,
        description: post.excerpt ?? `Read "${post.title}" from the TSOL studio.`,
    };
}

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((p) => ({ slug: p.slug.current }));
}

const BlogDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="blog-detail-main">
            <BlogDetailContent
                title={post.title}
                date={post.date}
                coverImage={post.coverImage}
                body={post.body}
            />

            <div className="blog-detail-back-container container">
                <Link href="/blog" className="blog-detail-back-link">
                    ← Back to Journal
                </Link>
            </div>
        </main>
    );
};

export default BlogDetailPage;
