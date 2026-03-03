import BlogPageSection from "../components/BlogPageSection/BlogPageSection";
import { getAllBlogPosts } from "../lib/queries";
import "./style.scss";

export const metadata = {
  title: "Journal — TSOL Architecture",
  description:
    "Thoughts from the TSOL studio — ideas and lessons on architecture, light, and design.",
};

const BlogPage = async () => {
  const posts = await getAllBlogPosts();

  return (
    <main className="blog-page-main">
      <BlogPageSection posts={posts} />
    </main>
  );
};

export default BlogPage;
