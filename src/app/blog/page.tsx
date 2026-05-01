"use client";

import { useState } from "react";
import Link from "next/link";
import "../blog.css";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  visual: "recap" | "guide" | "network" | "security" | "storage";
}

const CATEGORIES = ["All", "Guides", "Product", "Engineering", "Security", "Infrastructure"];

const POSTS: Post[] = [
  {
    id: "1",
    title: "Product Updates: Blackwell Clusters, Private Fabrics, and Faster Launches",
    excerpt:
      "Last quarter, we expanded dedicated GPU capacity, shortened private-cluster deployment windows, and shipped new observability controls for enterprise AI teams.",
    tag: "Product",
    author: "Alex Rivera",
    role: "Platform Engineering",
    date: "May 12, 2025",
    readTime: "8 min read",
    visual: "recap",
  },
  {
    id: "2",
    title: "How to run an effective GPU capacity planning exercise",
    excerpt:
      "When training schedules and inference demand change quickly, capacity planning has to model utilization, network pressure, storage throughput, and failure domains together.",
    tag: "Guides",
    author: "Sarah Chen",
    role: "Solutions Architect",
    date: "May 10, 2025",
    readTime: "5 min read",
    visual: "guide",
  },
  {
    id: "3",
    title: "Designing 400G InfiniBand fabrics for multi-node training",
    excerpt:
      "A practical look at topology choices, congestion controls, and private interconnect patterns for large distributed model training workloads.",
    tag: "Engineering",
    author: "James Wilson",
    role: "Network Systems",
    date: "May 08, 2025",
    readTime: "12 min read",
    visual: "network",
  },
  {
    id: "4",
    title: "Enterprise security controls for dedicated AI infrastructure",
    excerpt:
      "How hardened base images, private routing, audit telemetry, and compliance workflows fit into the lifecycle of production AI clusters.",
    tag: "Security",
    author: "Maria Gomez",
    role: "Security Lead",
    date: "May 05, 2025",
    readTime: "6 min read",
    visual: "security",
  },
  {
    id: "5",
    title: "Why storage latency becomes a training bottleneck",
    excerpt:
      "Model teams often optimize GPUs first, but dataset access patterns and checkpoint movement can decide whether expensive accelerators stay busy.",
    tag: "Infrastructure",
    author: "Elena Petrova",
    role: "Storage Systems",
    date: "May 02, 2025",
    readTime: "10 min read",
    visual: "storage",
  },
];

function AuthorMark({ name }: { name: string }) {
  return <span className="blog-author-mark">{name.split(" ").map((part) => part[0]).join("")}</span>;
}

function ArticleVisual({ type, label }: { type: Post["visual"]; label: string }) {
  return (
    <div className={`blog-visual blog-visual-${type}`} aria-hidden="true">
      <div className="blog-visual-grid" />
      <div className="blog-visual-card">
        <span>{label}</span>
        <strong>
          {type === "recap" ? "Q2" : type === "guide" ? "GPU" : type === "network" ? "400G" : type === "security" ? "SOC2" : "WEKA"}
        </strong>
        <em>→</em>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts = selectedCategory === "All" ? POSTS : POSTS.filter((post) => post.tag === selectedCategory);
  const [featured, ...articles] = filteredPosts;

  return (
    <main className="blog-page">
      <section className="blog-shell">
        <div className="blog-kicker">NeoCloudz Journal</div>
        <div className="blog-heading-row">
          <div>
            <h1>The NeoCloudz Blog</h1>
            <p>Product updates, technical guides, and infrastructure notes from the teams building AI compute.</p>
          </div>
          <div className="blog-category-nav" aria-label="Blog categories">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={category === selectedCategory ? "active" : undefined}
                aria-pressed={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {featured ? (
          <>
            <article className="blog-featured">
              <div className="blog-featured-copy">
                <div className="blog-meta-line">
                  <span>{featured.tag}</span>
                  <time>{featured.date}</time>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-featured-footer">
                  <div className="blog-author">
                    <AuthorMark name={featured.author} />
                    <span>
                      <strong>{featured.author}</strong>
                      <small>{featured.role}</small>
                    </span>
                  </div>
                  <Link href="/blog" className="blog-read-link">
                    Read article
                  </Link>
                </div>
              </div>
              <ArticleVisual type={featured.visual} label={featured.tag === "Product" ? "Quarterly Recap" : featured.tag} />
            </article>

            {articles.length > 0 ? (
              <div className="blog-article-list">
                {articles.map((post) => (
                  <article key={post.id} className="blog-article-row">
                    <ArticleVisual type={post.visual} label={post.tag} />
                    <div className="blog-row-copy">
                      <div className="blog-meta-line">
                        <span>{post.tag}</span>
                        <time>{post.date}</time>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <Link href="/blog" className="blog-read-link">
                        Read article
                      </Link>
                      <div className="blog-row-author">
                        <AuthorMark name={post.author} />
                        <span>
                          {post.author}
                          <small>{post.readTime}</small>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </section>
    </main>
  );
}
