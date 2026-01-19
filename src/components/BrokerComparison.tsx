import { Star, ExternalLink, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const brokers = [
  {
    name: "FXGlory",
    rating: 4.8,
    minDeposit: "$1",
    leverage: "1:3000",
    spreads: "0.1 pips",
    usAccepted: true,
    featured: true,
    reviewUrl: "/review/fxglory",
  },
  {
    name: "N1CM",
    rating: 4.2,
    minDeposit: "$1",
    leverage: "1:1000",
    spreads: "0.5 pips",
    usAccepted: true,
    featured: false,
    reviewUrl: "/review/n1cm",
  },
  {
    name: "eToro",
    rating: 4.5,
    minDeposit: "$50",
    leverage: "1:30",
    spreads: "1.0 pips",
    usAccepted: true,
    featured: false,
    reviewUrl: "/review/etoro",
  },
  {
    name: "FXPro",
    rating: 4.4,
    minDeposit: "$100",
    leverage: "1:200",
    spreads: "0.6 pips",
    usAccepted: false,
    featured: false,
    reviewUrl: null,
  },
  {
    name: "OANDA",
    rating: 4.5,
    minDeposit: "$0",
    leverage: "1:50",
    spreads: "1.0 pips",
    usAccepted: true,
    featured: false,
    reviewUrl: null,
  },
  {
    name: "IG Markets",
    rating: 4.6,
    minDeposit: "$250",
    leverage: "1:50",
    spreads: "0.6 pips",
    usAccepted: true,
    featured: false,
    reviewUrl: null,
  },
];

const BrokerComparison = () => {
  return (
    <section id="compare" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Compare Top Brokers
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
              {brokers.map((broker, i) => (
                <tr 
                  key={broker.name} 
                  className={`border-t border-border transition-colors hover:bg-secondary/50 ${broker.featured ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${broker.featured ? 'bg-gradient-gold text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                        {broker.name.slice(0, 2).toUpperCase()}
                      </div>
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
                      <span className="font-semibold text-foreground">{broker.rating}</span>
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
                        variant={broker.featured ? "gold" : "outline"} 
                        size="sm"
                        className="gap-1"
                        asChild
                      >
                        <Link to={broker.reviewUrl}>
                          Review
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-1"
                      >
                        Visit
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {brokers.map((broker) => (
            <div 
              key={broker.name}
              className={`rounded-xl border border-border p-4 ${broker.featured ? 'bg-primary/5 border-primary/30' : 'bg-card'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold ${broker.featured ? 'bg-gradient-gold text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                    {broker.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{broker.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{broker.rating}</span>
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
                  variant={broker.featured ? "gold" : "outline"} 
                  className="w-full gap-2"
                  asChild
                >
                  <Link to={broker.reviewUrl}>
                    Read Review
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                >
                  Visit Broker
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrokerComparison;
