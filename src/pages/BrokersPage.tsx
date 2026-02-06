import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Star, ExternalLink, Shield, Award, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrokerLogo from "@/components/BrokerLogo";
import { reviewedBrokers } from "@/lib/brokers";

const BrokersPage = () => {
  const allBrokersList = [...reviewedBrokers].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="All Forex Broker Reviews - Detailed Broker Analysis"
        description="Read detailed reviews of all forex brokers. In-depth analysis of trading conditions, platforms, regulation, and more."
        canonical="/brokers"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Forex Broker Reviews",
          "description": "Complete list of detailed forex broker reviews",
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm text-primary font-medium">
                {allBrokersList.length} In-Depth Reviews
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Forex Broker <span className="text-gradient-gold">Reviews</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              Detailed reviews with trading conditions, platform analysis, pros & cons, and user ratings.
            </p>
            <Button variant="outline" asChild>
              <Link to="/compare" className="inline-flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Use Comparison Tool
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brokers Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allBrokersList.map((broker, index) => (
              <div
                key={broker.id}
                className={`relative bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col gap-4 ${
                  broker.featured ? "ring-2 ring-primary border-primary/40" : ""
                }`}
              >
                {broker.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Editor&apos;s Choice
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <BrokerLogo broker={broker} />
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">
                        {broker.name}
                      </h2>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                          {broker.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    broker.usAccepted
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {broker.usAccepted ? "US Accepted" : "No US"}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-secondary/60 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground">Min Deposit</p>
                    <p className="font-semibold text-foreground text-xs">{broker.minDepositDisplay}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground">Leverage</p>
                    <p className="font-semibold text-foreground text-xs">{broker.leverage}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground">Spreads</p>
                    <p className="font-semibold text-foreground text-xs">{broker.spreads}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {broker.regulation} • Est. {broker.foundedYear} • {broker.headquarters}
                </p>

                <div className="flex gap-2 mt-auto">
                  <Button variant={broker.featured ? "default" : "outline"} className="flex-1" asChild>
                    <Link to={broker.reviewUrl}>
                      Read Review
                    </Link>
                  </Button>
                  {broker.affiliateUrl && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Compare */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Scale className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Need Help Choosing?</h2>
            <p className="text-muted-foreground mb-6">
              Use our comparison tool to filter brokers by regulation, deposit, leverage, and more.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/compare">
                Compare Brokers Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-xs md:text-sm text-muted-foreground text-center border border-border rounded-xl p-4 bg-secondary/40 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">Review Methodology</span>
            </div>
            <p>
              Each broker is reviewed based on trading conditions, platform quality, customer support,
              and regulatory status. Ratings reflect our editorial assessment combined with user feedback.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrokersPage;
