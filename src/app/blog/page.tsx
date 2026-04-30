import Link from "next/link";
import "../blog.css";
import { HeroParticles } from "@/components/layout/HeroParticles";
import { FinalCTA } from "@/components/layout/FinalCTA";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

const POSTS: Post[] = [
  {
    id: "1",
    title: "Scaling AI Infrastructure with NVIDIA Blackwell",
    excerpt: "How the next generation of GPUs is changing the landscape of large language model training and inference.",
    tag: "Hardware",
    author: "Alex Rivera",
    date: "May 12, 2025",
    readTime: "8 min read",
    image: "/images/blog/featured.png",
  },
  {
    id: "2",
    title: "The Future of Serverless GPU Clusters",
    excerpt: "Exploring how NeoCloudz is simplifying on-demand compute for growing research teams.",
    tag: "Cloud",
    author: "Sarah Chen",
    date: "May 10, 2025",
    readTime: "5 min read",
    image: "/images/blog/post1.png",
  },
  {
    id: "3",
    title: "Optimizing WEKA Storage for <10μs Latency",
    excerpt: "Deep dive into our data architecture and how we achieve record-breaking throughput for AI workloads.",
    tag: "Storage",
    author: "James Wilson",
    date: "May 08, 2025",
    readTime: "12 min read",
    image: "/images/blog/post2.png",
  },
  {
    id: "4",
    title: "Enterprise Security in AI Infrastructure",
    excerpt: "Maintaining SOC2 and HIPAA compliance while providing high-performance compute access.",
    tag: "Security",
    author: "Maria Gomez",
    date: "May 05, 2025",
    readTime: "6 min read",
    image: "/images/blog/post1.png",
  },
  {
    id: "5",
    title: "Bare Metal vs Virtualized GPUs: What's best?",
    excerpt: "Comparing performance overhead and flexibility for different types of machine learning workflows.",
    tag: "Benchmark",
    author: "Alex Rivera",
    date: "May 02, 2025",
    readTime: "10 min read",
    image: "/images/blog/post2.png",
  },
  {
    id: "6",
    title: "Announcing NeoCloudz API v2.0",
    excerpt: "New endpoints for automated cluster orchestration and real-time monitoring integration.",
    tag: "Product",
    author: "Elena Petrova",
    date: "Apr 28, 2025",
    readTime: "4 min read",
    image: "/images/blog/featured.png",
  },
];

export default function BlogPage() {
  const featured = POSTS[0];
  const gridPosts = POSTS.slice(1);

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <HeroParticles />
        <div className="blog-hero-content">
          <div className="post-tag">Engineering Blog</div>
          <h1>Insights into the <span className="g">Future of AI.</span></h1>
          <p>
            Updates, technical guides, and deep dives into the infrastructure
            powering the next generation of artificial intelligence.
          </p>
        </div>
      </header>

      <main className="blog-container">
        {/* Featured Post */}
        <section className="featured-post">
          <div className="featured-image">
            <img src={featured.image} alt={featured.title} />
            <div className="matrix-bg" style={{ opacity: 0.1, position: "absolute", inset: 0 }}></div>
          </div>
          <div className="featured-content">
            <div className="post-tag">{featured.tag}</div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="post-footer">
              <div className="post-author">
                <div className="author-avatar"></div>
                <span>{featured.author}</span>
              </div>
              <span>{featured.date} • {featured.readTime}</span>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <div className="blog-grid">
          {gridPosts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-image">
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="post-card-content">
                <div className="post-tag">{post.tag}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-read-more">
                  Read Article <span>→</span>
                </div>
                <div className="post-footer">
                  <div className="post-author">
                    <div className="author-avatar"></div>
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="newsletter-content">
          <div className="post-tag">Newsletter</div>
          <h2>Stay Ahead of <span className="g">the Curve.</span></h2>
          <p>
            Join 10,000+ AI researchers and engineers receiving our bi-weekly
            technical insights. No spam, just pure signal.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
