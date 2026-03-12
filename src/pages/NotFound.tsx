import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BarChart3, BookOpen, Calculator, TrendingUp } from "lucide-react";

const popularBrokers = [
  { name: "FXGlory", path: "/review/fxglory", tag: "Highest Leverage" },
  { name: "MidasFX", path: "/review/midasfx", tag: "US Accepted" },
  { name: "Hankotrade", path: "/review/hankotrade", tag: "5.0 Trustpilot" },
  { name: "OANDA", path: "/review/oanda", tag: "CFTC Regulated" },
];

const quickLinks = [
  { icon: BarChart3, label: "Compare Brokers", path: "/compare", desc: "Side-by-side comparison" },
  { icon: BookOpen, label: "Beginner's Guide", path: "/guides/beginners-guide", desc: "Start trading forex" },
  { icon: Calculator, label: "Trading Tools", path: "/tools", desc: "Pip & margin calculators" },
  { icon: TrendingUp, label: "All Brokers", path: "/brokers", desc: "22 broker reviews" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 - Page Not Found | Beginner FX Guide";
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 - Page Not Found | Beginner FX Guide"
        description="Sorry, the page you're looking for doesn't exist. Browse our forex broker reviews, guides, and trading tools."
        canonical="https://beginnerfxguide.com/404"
      />
      <Header />
      <main className="min-h-[70vh] bg-background">
        {/* Hero Section */}
        <section className="border-b bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl">
              <p className="mb-2 text-6xl font-bold text-primary">404</p>
              <h1 className="mb-3 text-2xl font-bold md:text-3xl">
                This page doesn't exist
              </h1>
              <p className="mb-8 text-muted-foreground">
                The page at <code className="rounded bg-muted px-2 py-0.5 text-sm">{location.pathname}</code> may have been moved or removed. But we've got plenty of resources to help you find the right forex broker.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="default" size="lg" asChild>
                  <Link to="/brokers">
                    Browse All Brokers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/compare">
                    <Search className="mr-2 h-4 w-4" /> Compare Brokers
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-xl font-semibold">
              Find what you're looking for
            </h2>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex items-start gap-4 rounded-lg border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-primary">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Broker Reviews */}
        <section className="border-t bg-muted/20 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-xl font-semibold">
              Popular Broker Reviews
            </h2>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {popularBrokers.map((broker) => (
                <Link
                  key={broker.path}
                  to={broker.path}
                  className="flex items-center justify-between rounded-lg border bg-card px-5 py-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold">{broker.name} Review</p>
                    <p className="text-xs text-muted-foreground">{broker.tag}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
