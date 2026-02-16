import { Star, ExternalLink, Check, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { reviewedBrokers, BrokerId, topBrokers } from "@/lib/brokers";
import BrokerLogo from "./BrokerLogo";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";

const MAX_BROKERS_SHOWN = 5;

const BrokerComparison = () => {
  // Show top 5 brokers sorted by rating
  const allBrokers = [...topBrokers].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    if (ratingB !== ratingA) {
      return ratingB - ratingA; // Higher rating first
    }
    return a.name.localeCompare(b.name); // Alphabetical if same rating
  });
  const comparisonBrokers = allBrokers.slice(0, MAX_BROKERS_SHOWN);
  const remainingCount = allBrokers.length - MAX_BROKERS_SHOWN;

  return (
    <section id="compare" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Compare Top <span className="text-gradient-gold">Brokers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Side-by-side comparison of top forex brokers
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block max-w-6xl mx-auto overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Broker</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Min Deposit</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Leverage</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Spreads</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Bonus</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">US Accepted</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {comparisonBrokers.map((broker, i) => (
                <tr 
                  key={broker.id} 
                  className={`border-t border-border transition-colors hover:bg-secondary/50 ${broker.featured ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <BrokerLogo broker={broker} className="w-10 h-10 rounded-lg" />
                      <div>
                        <p className="font-semibold text-foreground">{broker.name}</p>
                        {broker.featured && (
                          <span className="text-xs text-primary font-medium">Editor's Choice</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{broker.rating?.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-foreground">{broker.minDepositDisplay}</td>
                  <td className="px-6 py-4 text-center text-foreground">{broker.leverage}</td>
                  <td className="px-6 py-4 text-center text-foreground">{broker.spreads}</td>
                  <td className="px-6 py-4 text-center text-foreground">
                    {broker.bonus ? (
                      <span className="text-sm font-medium text-primary">{broker.bonus}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {broker.usAccepted ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {broker.reviewUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          asChild
                        >
                          <Link to={broker.reviewUrl}>
                            Review
                          </Link>
                        </Button>
                      )}
                      {(broker.affiliateUrl || broker.siteUrl) && (
                        <Button
                          variant={broker.featured ? "default" : "outline"}
                          size="sm"
                          className="gap-1"
                          asChild
                        >
                          <a
                            href={broker.affiliateUrl
                              ? getAffiliateUrl(broker.id as BrokerId, { source: "comparison", medium: "button", campaign: "comparison_table" })
                              : broker.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => broker.affiliateUrl && trackAffiliateClick(broker.id as BrokerId, "comparison_table", "open_account")}
                          >
                            Open Account
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* View All CTA - Desktop */}
          {remainingCount > 0 && (
            <div className="border-t border-border bg-secondary/30 px-6 py-5 text-center">
              <Link to="/brokers" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group">
                View All {allBrokers.length} Brokers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-muted-foreground mt-1">
                +{remainingCount} more brokers with detailed reviews
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
              {comparisonBrokers.map((broker) => (
            <div
              key={broker.id}
              className={`rounded-xl border border-border p-4 bg-card ${broker.featured ? 'border-primary/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BrokerLogo broker={broker} className="w-12 h-12 rounded-lg" />
                  <div>
                    <p className="font-semibold text-foreground">{broker.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{broker.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                {broker.featured && (
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    Editor's Choice
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">Min Deposit</p>
                  <p className="font-semibold text-foreground">{broker.minDepositDisplay}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">Leverage</p>
                  <p className="font-semibold text-foreground">{broker.leverage}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">Spreads</p>
                  <p className="font-semibold text-foreground">{broker.spreads}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">Bonus</p>
                  <p className="font-semibold text-foreground">
                    {broker.bonus ? (
                      <span className="text-primary">{broker.bonus}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {broker.reviewUrl && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    asChild
                  >
                    <Link to={broker.reviewUrl}>
                      Review
                    </Link>
                  </Button>
                )}
                {(broker.affiliateUrl || broker.siteUrl) && (
                  <Button
                    variant={broker.featured ? "default" : "outline"}
                    className="flex-1 gap-1"
                    size="sm"
                    asChild
                  >
                    <a
                      href={broker.affiliateUrl
                        ? getAffiliateUrl(broker.id as BrokerId, { source: "comparison", medium: "button", campaign: "comparison_mobile" })
                        : broker.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => broker.affiliateUrl && trackAffiliateClick(broker.id as BrokerId, "comparison_mobile", "open_account")}
                    >
                      Open Account
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
          {/* View All CTA - Mobile */}
          {remainingCount > 0 && (
            <div className="text-center pt-2">
              <Button variant="outline" size="lg" className="w-full gap-2 group" asChild>
                <Link to="/brokers">
                  View All {allBrokers.length} Brokers
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                +{remainingCount} more brokers with detailed reviews
              </p>
            </div>
          )}
        </div>

        {/* Risk Disclaimer for comparison table */}
        <div className="max-w-6xl mx-auto mt-6">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <span className="font-medium text-yellow-600">Risk Warning:</span> Forex and CFD trading involves substantial risk of loss and is not suitable for all investors.
            74-89% of retail investor accounts lose money when trading CFDs. Consider whether you understand how CFDs work and whether you can afford the high risk of losing your money.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokerComparison;