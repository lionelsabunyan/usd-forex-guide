import { Star, Check, ExternalLink, Award, Shield, Zap, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { brokers } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";

const FeaturedBroker = () => {
  const pros = [
    "Accepts US clients",
    "FSA regulated broker",
    "0.0 pip raw spreads",
    "24/7 customer support",
    "Fast crypto withdrawals",
    "MT4 & MT5 platforms",
  ];

  const cons = [
    "Higher minimum deposit ($50)",
    "Limited educational resources",
  ];

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Editor's Choice 2026</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient-gold">Broker Review</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our in-depth analysis of the top forex broker for US traders
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side - Broker info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  <BrokerLogo broker={brokers.midasfx} className="w-20 h-20 rounded-xl" imgClassName="p-3" />
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                      MidasFX
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < 5 ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-foreground font-semibold">4.8/5</span>
                      <span className="text-muted-foreground text-sm">(1,523 reviews)</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      FSA regulated broker actively accepting US clients with raw spreads and fast execution.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Min Deposit</p>
                    <p className="font-bold text-foreground">$50</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Max Leverage</p>
                    <p className="font-bold text-foreground">1:500</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Spreads From</p>
                    <p className="font-bold text-foreground">0.0 pips</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Platforms</p>
                    <p className="font-bold text-foreground">MT4/MT5</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="default" className="flex-1" asChild>
                    <a
                      href={getAffiliateUrl("midasfx", UTM_CONFIGS.FEATURED_BROKER)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("midasfx", "featured_broker", "open_account")}
                    >
                      Open Account
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/review/midasfx">Read Full Review</Link>
                  </Button>
                </div>

                {/* Risk Disclaimer */}
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  <span className="font-medium text-yellow-600">Risk Warning:</span> Forex trading involves substantial risk of loss. 74-89% of retail investor accounts lose money.
                </p>
              </div>

              {/* Right side - Pros and Cons */}
              <div className="lg:w-80 space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-success mb-3">
                    <Check className="w-5 h-5" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-destructive mb-3">
                    <span className="w-5 h-5 flex items-center justify-center">✕</span>
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive shrink-0">✕</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBroker;
