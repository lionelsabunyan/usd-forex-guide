import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BrokerCard from "@/components/compare/BrokerCard";
import CompareFilters, { SortOption, BrokerTypeFilter } from "@/components/compare/CompareFilters";
import { Button } from "@/components/ui/button";
import { topBrokers, Broker } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { Scale, BarChart3, Shield, Award, ArrowRight, Star } from "lucide-react";

const ComparePage = () => {
  // Use all brokers
  const regionBrokers = topBrokers;

  // Filter states
  const [usAcceptedOnly, setUsAcceptedOnly] = useState(false);
  const [brokerType, setBrokerType] = useState<BrokerTypeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [cryptoOnly, setCryptoOnly] = useState(false);
  const [maxDeposit, setMaxDeposit] = useState<number | null>(null);

  const resetFilters = () => {
    setUsAcceptedOnly(false);
    setBrokerType("all");
    setSortBy("rating");
    setCryptoOnly(false);
    setMaxDeposit(null);
  };

  // Filtered and sorted brokers
  const filteredBrokers = useMemo(() => {
    let result = [...regionBrokers];

    // Apply filters
    if (usAcceptedOnly) {
      result = result.filter((b) => b.usAccepted);
    }

    if (brokerType !== "all") {
      result = result.filter((b) => b.type === brokerType);
    }

    if (cryptoOnly) {
      result = result.filter((b) => b.cryptoDeposits);
    }

    if (maxDeposit !== null) {
      result = result.filter((b) => b.minDeposit <= maxDeposit);
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "minDeposit":
        result.sort((a, b) => a.minDeposit - b.minDeposit);
        break;
      case "spreads":
        result.sort((a, b) => a.spreadsFrom - b.spreadsFrom);
        break;
      case "leverage":
        result.sort((a, b) => b.leverageValue - a.leverageValue);
        break;
    }

    return result;
  }, [usAcceptedOnly, brokerType, sortBy, cryptoOnly, maxDeposit]);

  // Stats
  const stats = useMemo(() => {
    const usAccepted = topBrokers.filter((b) => b.usAccepted).length;
    const offshore = topBrokers.filter((b) => b.type === "offshore").length;
    const regulated = topBrokers.filter((b) => b.type === "regulated").length;
    return { total: topBrokers.length, usAccepted, offshore, regulated };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Compare Forex Brokers 2026 - Side by Side Comparison"
        description="Compare the best forex brokers side by side. Filter by regulation, minimum deposit, leverage, and more. Find the perfect broker for your trading needs."
        canonical="/compare"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Forex Broker Comparison Tool",
          description: "Compare forex brokers with our interactive comparison tool",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: stats.total,
            itemListElement: filteredBrokers.slice(0, 10).map((broker, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "FinancialService",
                name: broker.name,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: broker.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
              },
            })),
          },
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                {stats.total} Brokers Compared
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Compare <span className="text-gradient-gold">Forex Brokers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect broker for your trading style. Filter by regulation, deposit, leverage, and more.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <BarChart3 className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Brokers</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Shield className="w-5 h-5 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.usAccepted}</p>
              <p className="text-xs text-muted-foreground">Accept US Clients</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Award className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.regulated}</p>
              <p className="text-xs text-muted-foreground">CFTC/NFA Regulated</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Scale className="w-5 h-5 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.offshore}</p>
              <p className="text-xs text-muted-foreground">Offshore Brokers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <CompareFilters
                  usAcceptedOnly={usAcceptedOnly}
                  setUsAcceptedOnly={setUsAcceptedOnly}
                  brokerType={brokerType}
                  setBrokerType={setBrokerType}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  cryptoOnly={cryptoOnly}
                  setCryptoOnly={setCryptoOnly}
                  maxDeposit={maxDeposit}
                  setMaxDeposit={setMaxDeposit}
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Broker Cards */}
            <main className="flex-1">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredBrokers.length}</span> brokers
                </p>
                {sortBy !== "rating" && (
                  <p className="text-sm text-muted-foreground">
                    Sorted by: <span className="font-medium text-foreground capitalize">{sortBy === "minDeposit" ? "Min Deposit" : sortBy}</span>
                  </p>
                )}
              </div>

              {/* Editor's Pick Banner */}
              <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary fill-primary/50" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Editor's Pick — Hankotrade</p>
                    <p className="text-xs text-muted-foreground">Best for US traders · Zero spreads · $10 min deposit · Crypto deposits</p>
                  </div>
                </div>
                <Button variant="default" size="sm" className="flex-shrink-0" asChild>
                  <a
                    href={getAffiliateUrl("hankotrade", UTM_CONFIGS.REVIEW_HERO)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick("hankotrade", "compare_featured", "open_account")}
                  >
                    Open Account <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>

              {/* Cards Grid */}
              {filteredBrokers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredBrokers.map((broker, index) => (
                    <BrokerCard
                      key={broker.id}
                      broker={broker}
                      rank={sortBy === "rating" ? index + 1 : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <p className="text-lg text-muted-foreground mb-4">
                    No brokers match your current filters
                  </p>
                  <button
                    onClick={resetFilters}
                    className="text-primary hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6">
              How We Compare Forex Brokers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Trading Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  We evaluate spreads, leverage, execution speed, and available instruments to ensure you get the best trading experience.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Platform & Tools</h3>
                <p className="text-sm text-muted-foreground">
                  From MT4/MT5 to proprietary platforms, we test each broker's trading tools, charting, and mobile apps.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Customer Support</h3>
                <p className="text-sm text-muted-foreground">
                  We contact support teams to test response times, knowledge, and availability across different channels.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Trust & Reputation</h3>
                <p className="text-sm text-muted-foreground">
                  Regulatory status, years in business, and user reviews all factor into our trust assessment.
                </p>
              </div>
            </div>

            {/* Closing CTA */}
            <div className="mt-10 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-8 text-center">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">Ready to Start?</p>
              <h3 className="font-heading text-2xl font-bold mb-3">Open an Account with Our Top-Rated Broker</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Hankotrade ranked #1 for US traders — zero spreads, $10 minimum deposit, and crypto deposits accepted.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href={getAffiliateUrl("hankotrade", UTM_CONFIGS.HERO_PRIMARY)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hankotrade", "compare_bottom_cta", "open_account")}
                >
                  Open Hankotrade Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">🇺🇸 US Clients Accepted · Takes 2 minutes · No hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComparePage;
