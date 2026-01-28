import { Star, ExternalLink, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { reviewedBrokers, brokers as allBrokers } from "@/lib/brokers";
import BrokerLogo from "./BrokerLogo";

const BrokerComparison = () => {
  // Combine reviewed brokers with non-reviewed ones for comparison
  // Sort by rating (highest first), then by name
  const comparisonBrokers = [
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
    <section id="compare" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Compare Top <span className="text-gradient-gold">Brokers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Side-by-side comparison of forex brokers accepting US clients
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
                  <td className="px-6 py-4 text-center text-foreground">{broker.minDeposit}</td>
                  <td className="px-6 py-4 text-center text-foreground">{broker.leverage}</td>
                  <td className="px-6 py-4 text-center text-foreground">{broker.spreads}</td>
                  <td className="px-6 py-4 text-center">
                    {broker.usAccepted ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {broker.reviewUrl ? (
                      <Button
                        variant={broker.featured ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        asChild
                      >
                        <Link to={broker.reviewUrl}>
                          Review
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </Button>
                    ) : broker.siteUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        asChild
                      >
                        <a
                          href={broker.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  <p className="font-semibold text-foreground">{broker.minDeposit}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">Leverage</p>
                  <p className="font-semibold text-foreground">{broker.leverage}</p>
                </div>
              </div>

              {broker.reviewUrl ? (
                <Button
                  variant={broker.featured ? "default" : "outline"}
                  className="w-full gap-2"
                  asChild
                >
                  <Link to={broker.reviewUrl}>
                    Read Review
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              ) : broker.siteUrl ? (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  asChild
                >
                  <a
                    href={broker.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Broker
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrokerComparison;