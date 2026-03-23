import TRLayout from "@/components/tr/TRLayout";
import { Clock, ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getBlogPostTR, blogCategoriesTR, getRelatedPostsTR } from "@/lib/blogTR";
import Breadcrumb from "@/components/Breadcrumb";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { Card, CardContent } from "@/components/ui/card";

const BlogYaziSayfasi = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostTR(slug) : undefined;

  if (!post) {
    return <Navigate to="/tr/blog" replace />;
  }

  const relatedPosts = getRelatedPostsTR(slug || "", 3);

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "inLanguage": "tr",
    "author": {
      "@type": "Organization",
      "name": "Beginner FX Guide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Beginner FX Guide"
    },
    "datePublished": "2026-03-22",
    "dateModified": "2026-03-22",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://beginnerfxguide.com/tr/blog/${slug}`
    }
  };

  const generateHeadingId = (text: string, idx: number) => {
    return `heading-${idx}-${text.toLowerCase().replace(/[^a-z0-9çğıöşü]+/g, "-")}`;
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;

    const processBoldAndLinks = (text: string, keyPrefix: string) => {
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

      if (matches.length === 0) return text;

      matches.forEach((m, i) => {
        if (m.start > lastIndex) parts.push(text.substring(lastIndex, m.start));
        if (m.type === 'bold') {
          parts.push(<strong key={`${keyPrefix}-bold-${i}`} className="text-foreground font-semibold">{m.content}</strong>);
        } else if (m.type === 'link') {
          parts.push(<a key={`${keyPrefix}-link-${i}`} href={m.href} className="text-primary underline hover:text-accent">{m.content}</a>);
        }
        lastIndex = m.end;
      });
      if (lastIndex < text.length) parts.push(text.substring(lastIndex));
      return <>{parts}</>;
    };

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        elements.push(
          <p key={`p-${elements.length}`} className="text-muted-foreground mb-4 leading-relaxed">
            {processBoldAndLinks(text, `p-${elements.length}`)}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType === 'ul' ? 'ul' : 'ol';
        elements.push(
          <ListTag key={`list-${elements.length}`} className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} ml-6 mb-4 space-y-2`}>
            {listItems.map((item, i) => {
              const cleanItem = item.replace(/^[-*]\s+|\d+\.\s+/, '');
              return (
                <li key={i} className="text-muted-foreground">
                  {processBoldAndLinks(cleanItem, `li-${elements.length}-${i}`)}
                </li>
              );
            })}
          </ListTag>
        );
        listItems = [];
        inList = false;
        listType = null;
      }
    };

    // Simple table parsing
    const isTableRow = (line: string) => line.trim().startsWith('|') && line.trim().endsWith('|');
    const isTableSeparator = (line: string) => /^\|[\s-:|]+\|$/.test(line.trim());
    let tableRows: string[] = [];
    let inTable = false;

    const flushTable = () => {
      if (tableRows.length < 2) {
        tableRows = [];
        inTable = false;
        return;
      }
      const dataRows = tableRows.filter(r => !isTableSeparator(r));
      const headerCells = dataRows[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const bodyRows = dataRows.slice(1).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));

      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                {headerCells.map((cell, i) => (
                  <th key={i} className="text-left py-2 px-3 font-semibold text-foreground">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Table handling
      if (isTableRow(trimmed)) {
        if (!inTable) {
          flushParagraph();
          flushList();
          inTable = true;
        }
        tableRows.push(trimmed);
        return;
      } else if (inTable) {
        flushTable();
      }

      // Checkbox list items
      if (trimmed.match(/^- \[[ x]\]/)) {
        flushParagraph();
        if (!inList || listType !== 'ul') {
          flushList();
          inList = true;
          listType = 'ul';
        }
        listItems.push(trimmed.replace(/^- \[[ x]\]\s*/, ''));
        return;
      }

      if (trimmed.startsWith('# ')) {
        flushParagraph();
        flushList();
        // Skip H1
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        const headingText = trimmed.substring(3);
        const headingId = generateHeadingId(headingText, idx);
        elements.push(
          <h2 key={`h2-${idx}`} id={headingId} className="font-heading text-2xl font-bold text-foreground mb-3 mt-8 scroll-mt-24">
            {headingText}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        const headingText = trimmed.substring(4);
        const headingId = generateHeadingId(headingText, idx);
        elements.push(
          <h3 key={`h3-${idx}`} id={headingId} className="font-heading text-xl font-bold text-foreground mb-2 mt-6 scroll-mt-24">
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
    if (inTable) flushTable();

    return elements;
  };

  const categoryInfo = blogCategoriesTR[post.category];

  return (
    <TRLayout
      title={post.title}
      description={post.excerpt}
      keywords={post.tags?.join(", ")}
    >
      <ReadingProgressBar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Ana Sayfa", href: "/tr" },
                { label: "Blog", href: "/tr/blog" },
                { label: post.title }
              ]}
              className="mb-6"
            />
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/tr/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog'a Dön
              </Link>
            </Button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className={`px-3 py-1 rounded-full border ${categoryInfo.color}`}>
                {categoryInfo.label}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <span>{post.date}</span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose-custom">
              {renderContent(post.content)}
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Benzer Yazılar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map(related => (
                    <Card key={related.slug} className="bg-card border-border hover:border-primary/50 transition-all">
                      <CardContent className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${blogCategoriesTR[related.category].color} mb-2 inline-block`}>
                          {blogCategoriesTR[related.category].label}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                          <Link to={`/tr/blog/${related.slug}`} className="hover:text-primary transition-colors">
                            {related.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default BlogYaziSayfasi;
