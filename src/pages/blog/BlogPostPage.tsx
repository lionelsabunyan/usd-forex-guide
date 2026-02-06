import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getBlogPost, blogCategories } from "@/lib/blog";
import NotFound from "../NotFound";
import BlogCover from "@/components/BlogCover";
import SEO from "@/components/SEO";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import SocialShare from "@/components/SocialShare";
import RelatedPosts from "@/components/RelatedPosts";
import NewsletterCTA from "@/components/NewsletterCTA";
import LeadMagnetBanner from "@/components/LeadMagnetBanner";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  // Blog post SEO schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "US Forex Guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "US Forex Guide"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://beginnerfxguide.com/blog/${slug}`
    }
  };

  // Simple markdown-like rendering with heading IDs for TOC
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;
    let newsletterInserted = false;
    const totalLines = lines.length;

    const generateHeadingId = (text: string, idx: number) => {
      return `heading-${idx}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    };

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        // Process markdown-like syntax
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        const boldRegex = /\*\*(.+?)\*\*/g;
        const linkRegex = /\[(.+?)\]\((.+?)\)/g;
        const matches: Array<{ type: 'bold' | 'link'; start: number; end: number; content: string; href?: string }> = [];

        let match;
        while ((match = boldRegex.exec(text)) !== null) {
          matches.push({ type: 'bold', start: match.index, end: match.index + match[0].length, content: match[1] });
        }
        while ((match = linkRegex.exec(text)) !== null) {
          matches.push({ type: 'link', start: match.index, end: match.index + match[0].length, content: match[1], href: match[2] });
        }

        matches.sort((a, b) => a.start - b.start);

        if (matches.length === 0) {
          parts.push(text);
        } else {
          matches.forEach((m, i) => {
            if (m.start > lastIndex) {
              parts.push(text.substring(lastIndex, m.start));
            }
            if (m.type === 'bold') {
              parts.push(<strong key={`bold-${i}`} className="text-foreground font-semibold">{m.content}</strong>);
            } else if (m.type === 'link') {
              parts.push(<a key={`link-${i}`} href={m.href} className="text-primary underline hover:text-accent">{m.content}</a>);
            }
            lastIndex = m.end;
          });
          if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
          }
        }

        elements.push(
          <p key={`p-${elements.length}`} className="text-muted-foreground mb-4 leading-relaxed">
            {parts}
          </p>
        );
        currentParagraph = [];
        lastIndex = 0;
      }
    };

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType === 'ul' ? 'ul' : 'ol';
        elements.push(
          <ListTag key={`list-${elements.length}`} className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} ml-6 mb-4 space-y-2`}>
            {listItems.map((item, i) => (
              <li key={i} className="text-muted-foreground">{item.replace(/^[-*]\s+|\d+\.\s+/, '')}</li>
            ))}
          </ListTag>
        );
        listItems = [];
        inList = false;
        listType = null;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Insert lead magnet CTA at ~50% of content
      if (!newsletterInserted && idx > totalLines * 0.5) {
        flushParagraph();
        flushList();
        elements.push(
          <LeadMagnetBanner key="leadmagnet-mid" variant="inline" />
        );
        newsletterInserted = true;
      }

      if (trimmed.startsWith('# ')) {
        flushParagraph();
        flushList();
        // Skip H1 as we have it in the hero
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        const headingText = trimmed.substring(3);
        const headingId = generateHeadingId(headingText, idx);
        elements.push(
          <h2
            key={`h2-${idx}`}
            id={headingId}
            className="font-heading text-2xl font-bold text-foreground mb-3 mt-8 scroll-mt-24"
          >
            {headingText}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        const headingText = trimmed.substring(4);
        const headingId = generateHeadingId(headingText, idx);
        elements.push(
          <h3
            key={`h3-${idx}`}
            id={headingId}
            className="font-heading text-xl font-bold text-foreground mb-2 mt-6 scroll-mt-24"
          >
            {headingText}
          </h3>
        );
      } else if (trimmed.match(/^[-*]\s+/)) {
        flushParagraph();
        if (!inList || listType !== 'ul') {
          flushList();
          inList = true;
          listType = 'ul';
        }
        listItems.push(trimmed);
      } else if (trimmed.match(/^\d+\.\s+/)) {
        flushParagraph();
        if (!inList || listType !== 'ol') {
          flushList();
          inList = true;
          listType = 'ol';
        }
        listItems.push(trimmed);
      } else if (trimmed === '') {
        flushParagraph();
        flushList();
      } else {
        flushList();
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <SEO
        title={`${post.title} | US Forex Guide Blog`}
        description={post.excerpt}
        canonical={`/blog/${slug}`}
        jsonLd={blogPostSchema}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            {post.coverImage && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <BlogCover post={post} variant="style2" className="rounded-2xl" />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className={`px-3 py-1 rounded-full border ${blogCategories[post.category].color}`}>
                {blogCategories[post.category].label}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <span>{post.date}</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <SocialShare url={`/blog/${slug}`} title={post.title} />
          </div>
        </div>
      </section>

      {/* Content with TOC */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex gap-8">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              {renderContent(post.content)}

              {/* Bottom Social Share */}
              <div className="mt-8 pt-8 border-t border-border">
                <SocialShare url={`/blog/${slug}`} title={post.title} />
              </div>

              {/* Lead Magnet CTA at End */}
              <LeadMagnetBanner variant="card" />

              {/* Related Posts */}
              <RelatedPosts currentSlug={slug || ""} />
            </article>

            {/* Sticky TOC Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents content={post.content} className="bg-gradient-card border border-border rounded-xl p-4" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
