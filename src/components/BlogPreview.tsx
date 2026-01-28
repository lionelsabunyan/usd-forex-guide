import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { blogPosts } from "@/lib/blog";
import BlogCover from "./BlogCover";

const BlogPreview = () => {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Latest <span className="text-gradient-gold">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert guides and strategies for US forex traders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <BlogCover post={post} variant="style2" />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  <Button variant="outlineGold" size="sm" asChild className="w-full">
                    <Link to={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
