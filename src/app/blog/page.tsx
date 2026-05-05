import Link from "next/link";
import { getBlogs } from "@/services/api/blog";
import "../blog.css";

export const metadata = {
  title: "Blog — NeoCloudz",
  description: "Product updates, technical guides, and infrastructure notes from the teams building AI compute.",
};

export default async function BlogPage() {
  const { data: blogs } = await getBlogs();
  
  const [featured, ...articles] = blogs || [];

  return (
    <main className="blog-page">
      <section className="blog-shell">
        <div className="blog-kicker">NeoCloudz Journal</div>
        <div className="blog-heading-row">
          <div>
            <h1>The NeoCloudz Blog</h1>
            <p>Product updates, technical guides, and infrastructure notes from the teams building AI compute.</p>
          </div>
        </div>

        {featured ? (
          <div className="blog-content-stack">
            <article className="blog-featured">
              <div className="blog-featured-copy">
                <div className="blog-meta-line">
                  <span className="blog-tag">PRODUCT</span>
                  <time>{featured.date}</time>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.shortDescription}</p>
                <div className="blog-featured-footer">
                  <div className="blog-author">
                    <span className="blog-author-mark">AR</span>
                    <span>
                      <strong>Alex Rivera</strong>
                      <small>Platform Engineering</small>
                    </span>
                  </div>
                  <Link href={`/blog/${featured.documentId}`} className="blog-read-link">
                    Read article
                  </Link>
                </div>
              </div>
              <div className="blog-featured-visual">
                {featured.image ? (
                  <img src={featured.image.url} alt={featured.image.alternativeText || featured.title} />
                ) : (
                  <div className="blog-visual-placeholder">
                    <span>Q2</span>
                  </div>
                )}
              </div>
            </article>

            {articles.length > 0 && (
              <div className="blog-article-list">
                {articles.map((post) => (
                  <article key={post.documentId} className="blog-article-row">
                    <div className="blog-row-copy">
                      <div className="blog-meta-line">
                        <span className="blog-tag">ENGINEERING</span>
                        <time>{post.date}</time>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.shortDescription}</p>
                      <div className="blog-row-footer">
                        <div className="blog-author">
                          <span className="blog-author-mark">AR</span>
                          <span>
                            <strong>Alex Rivera</strong>
                            <small>Platform Engineering</small>
                          </span>
                        </div>
                        <Link href={`/blog/${post.documentId}`} className="blog-read-link">
                          Read article
                        </Link>
                      </div>
                    </div>
                    <div className="blog-row-visual">
                      {post.image ? (
                        <img src={post.image.url} alt={post.image.alternativeText || post.title} />
                      ) : (
                        <div className="blog-visual-placeholder">
                          <span>GPU</span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="blog-empty">
            <p>No articles found. Stay tuned for updates!</p>
          </div>
        )}
      </section>
    </main>
  );
}
