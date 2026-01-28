import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import NotFound from "../NotFound";
import BlogCover from "@/components/BlogCover";
const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;

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
      
      if (trimmed.startsWith('# ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h1 key={`h1-${idx}`} className="font-heading text-3xl font-bold text-foreground mb-4 mt-8">
            {trimmed.substring(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h2 key={`h2-${idx}`} className="font-heading text-2xl font-bold text-foreground mb-3 mt-6">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h3 key={`h3-${idx}`} className="font-heading text-xl font-bold text-foreground mb-2 mt-4">
            {trimmed.substring(4)}
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
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {renderContent(post.content)}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
