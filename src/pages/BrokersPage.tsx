import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Star, ExternalLink, Shield, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrokerLogo from "@/components/BrokerLogo";
import { reviewedBrokers, brokers as allBrokers } from "@/lib/brokers";

const BrokersPage = () => {
  // Include all brokers: reviewed ones + OANDA and IG Markets
  const allBrokersList = [
    ...reviewedBrokers,
    allBrokers.oanda,
    allBrokers.ig,
  ].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    if (ratingB !== ratingA) {
      return ratingB - ratingA; // Higher rating first
    }
    return a.name.localeCompare(b.name); // Alphabetical if same rating
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="All Forex Brokers - Compare Top Brokers for US Traders"
        description="Compare all reviewed forex brokers for US traders. Ratings, minimum deposits, leverage, spreads, and detailed reviews. Find the best broker for your trading needs."
        canonical="/brokers"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Forex Brokers Comparison",
          "description": "Complete list of reviewed forex brokers for US traders",
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm text-primary font-medium">
                {allBrokersList.length} Brokers – Ranked for US Traders
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Compare Top <span className="text-gradient-gold">Forex Brokers</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Curated list of brokers we have reviewed in detail. Start from FXGlory and N1CM for high leverage, or explore CFTC-regulated options like Forex.com and Interactive Brokers.
            </p>
          </div>
        </div>
      </section>

      {/* Brokers Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {allBrokersList.map((broker, index) => (
              <div
                key={broker.name}
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
                        {index + 1}. {broker.name}
                      </h2>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                          {(broker.rating ?? 0).toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground">
                    {broker.usAccepted ? "US Accepted" : "Limited US Access"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-secondary/60 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Min Deposit</p>
                    <p className="font-semibold text-foreground">{broker.minDeposit}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Leverage</p>
                    <p className="font-semibold text-foreground">{broker.leverage}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-muted-foreground">Spreads</p>
                    <p className="font-semibold text-foreground">{broker.spreads}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  {broker.reviewUrl ? (
                    <>
                      <Button variant={broker.featured ? "hero" : "outline"} className="w-full" asChild>
                        <Link to={broker.reviewUrl}>
                          Read Full Review
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-xs md:text-sm"
                        asChild
                      >
                        <Link to={`${broker.reviewUrl}#trading-conditions`}>
                          View Trading Conditions
                        </Link>
                      </Button>
                    </>
                  ) : broker.siteUrl ? (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  ) : null}
                </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small note */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-xs md:text-sm text-muted-foreground text-center border border-border rounded-xl p-4 bg-secondary/40 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">How we rank brokers</span>
            </div>
            <p>
              Rankings are based on our editorial assessment of trading conditions, regulation,
              platform quality and feedback from US traders. Always do your own due diligence
              before opening an account.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrokersPage;

