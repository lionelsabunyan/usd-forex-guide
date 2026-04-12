import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

const TableOfContents = ({ content, className }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const lines = content.split("\n");
    const tocItems: TocItem[] = [];

    lines.forEach((line, index) => {
      const h2Match = line.match(/^## (.+)$/);
      const h3Match = line.match(/^### (.+)$/);

      if (h2Match) {
        const text = h2Match[1].trim();
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        tocItems.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        tocItems.push({ id, text, level: 3 });
      }
    });

    setHeadings(tocItems);
  }, [content]);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length > 0) {
      setActiveId(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    observerRef.current?.disconnect();

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings, handleIntersect]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className={cn("space-y-2", className)}>
      <h4 className="font-heading font-semibold text-foreground mb-4">
        Table of Contents
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              heading.level === 3 && "ml-4"
            )}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "text-sm text-left w-full py-1 transition-colors hover:text-primary",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
