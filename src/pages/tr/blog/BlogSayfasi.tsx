import TRLayout from "@/components/tr/TRLayout";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPostsTR, blogCategoriesTR, BlogCategoryTR } from "@/lib/blogTR";
import { useState } from "react";

const BlogSayfasi = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryTR | "all">("all");

  const sortedPosts = [...blogPostsTR].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const filteredPosts = selectedCategory === "all"
    ? sortedPosts
    : sortedPosts.filter(post => post.category === selectedCategory);

  return (
    <TRLayout
      title="Forex Blog"
      description="Forex eğitim yazıları, strateji rehberleri ve Türkiye'ye özel mevzuat bilgileri. Türk trader'lar için güncel forex içerikleri."
      keywords="forex blog, forex eğitim, forex strateji, forex türkiye, forex vergi"
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Forex <span className="text-gradient-gold">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Türk trader'lar için forex eğitim yazıları, strateji rehberleri ve güncel piyasa bilgileri
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="rounded-full"
              >
                Tüm Yazılar
              </Button>
              {(Object.entries(blogCategoriesTR) as [BlogCategoryTR, typeof blogCategoriesTR[BlogCategoryTR]][]).map(([key, cat]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                  className="rounded-full"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} yazı gösteriliyor
                {selectedCategory !== "all" && ` — ${blogCategoriesTR[selectedCategory].label}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const categoryInfo = blogCategoriesTR[post.category];
                return (
                  <Card key={post.slug} className="bg-card border-border hover:border-primary/50 transition-all group">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryInfo.color}`}>
                          {categoryInfo.label}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/tr/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <Link
                          to={`/tr/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                          Devamını Oku
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Forex Broker Karşılaştırması
            </h2>
            <p className="text-muted-foreground mb-6">
              Türkiye'den erişilebilen en iyi forex broker'ları karşılaştırın.
            </p>
            <Link
              to="/tr"
              className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium inline-block"
            >
              Broker'ları Karşılaştır
            </Link>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default BlogSayfasi;
