import Link from "next/link";
import { getBlogByDocumentId } from "@/services/api/blog";
import "../../blog.css";

export default async function BlogDetailPage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const { data: blog } = await getBlogByDocumentId(documentId);

  if (!blog) {
    return <div className="blog-page"><div className="blog-shell">Post not found</div></div>;
  }

  return (
    <main className="blog-page blog-detail">
      <article className="blog-shell">
        <Link href="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>
        
        <div className="blog-detail-header">
          <time className="blog-date">{blog.date}</time>
          <h1>{blog.title}</h1>
          <p className="blog-short-desc">{blog.shortDescription}</p>
        </div>

        {blog.image && (
          <div className="blog-detail-image">
            <img src={blog.image.url} alt={blog.image.alternativeText || blog.title} />
          </div>
        )}

        <div 
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog.longDescription }}
        />
      </article>
    </main>
  );
}
