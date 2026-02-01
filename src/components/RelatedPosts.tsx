import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { getRelatedPosts, blogCategories } from "@/lib/blog";
import BlogCover from "./BlogCover";

interface RelatedPostsProps {
  currentSlug: string;
}

const RelatedPosts = ({ currentSlug }: RelatedPostsProps) => {
  const relatedPosts = getRelatedPosts(currentSlug, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
        Related Articles
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card
            key={post.slug}
            className="bg-gradient-card border-border hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <BlogCover post={post} variant="style2" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${blogCategories[post.category].color}`}
                  >
                    {blogCategories[post.category].label}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm text-primary hover:text-accent transition-colors"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
