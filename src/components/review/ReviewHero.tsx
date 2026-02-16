import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import type { BrokerReviewData } from "@/lib/brokerReviewData";

interface ReviewHeroProps {
  data: BrokerReviewData;
}

const ReviewHero = ({ data }: ReviewHeroProps) => {
  const broker = brokers[data.brokerId];
  const BadgeIcon = data.heroBadge.icon;

  return (
    <section className="pt-24 pb-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              {/* Trust Score Badge */}
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${data.heroBadge.colorClass} mb-4`}>
                <div className="flex items-center gap-2">
                  <BadgeIcon className="w-5 h-5" />
                  <span className="text-sm font-bold">Trust Score: {data.trustScore}/100</span>
                </div>
                {data.trustpilotRating && (
                  <>
                    <div className="w-px h-4 bg-current opacity-30" />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">{data.trustpilotRating}/5 Trustpilot</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <BrokerLogo broker={broker} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{data.brokerName} Review</h1>
                    {data.keyHighlights.usClients === "YES" && (
                      <span className="px-2 py-1 text-xs font-bold bg-success/10 text-success rounded">US ACCEPTED</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{data.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(data.overallRating) ? 'fill-primary text-primary' : i < data.overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-2xl font-bold text-foreground">{data.overallRating}/5</span>
                <span className="text-muted-foreground">Expert Rating</span>
              </div>

              <p className="text-lg text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: data.heroDescription }} />

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{data.keyHighlights.minDeposit}</div>
                  <div className="text-xs text-muted-foreground">Min Deposit</div>
                </div>
                <div className="text-center border-l border-border">
                  <div className="text-2xl font-bold text-primary">{data.keyHighlights.maxLeverage}</div>
                  <div className="text-xs text-muted-foreground">Max Leverage</div>
                </div>
                <div className="text-center border-l border-border">
                  <div className="text-2xl font-bold text-primary">{data.keyHighlights.spreadFrom}</div>
                  <div className="text-xs text-muted-foreground">Spread From</div>
                </div>
                <div className="text-center border-l border-border">
                  <div className={`text-2xl font-bold ${data.keyHighlights.usClients === "YES" ? "text-success" : data.keyHighlights.usClients === "LIMITED" ? "text-warning" : "text-destructive"}`}>
                    {data.keyHighlights.usClients}
                  </div>
                  <div className="text-xs text-muted-foreground">US Clients</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={getAffiliateUrl(data.brokerId, UTM_CONFIGS.REVIEW_HERO)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(data.brokerId, "review_hero", "visit_site")}>
                    Visit {data.brokerName} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outlineGold" size="lg" asChild>
                  <Link to="/compare">Compare Brokers</Link>
                </Button>
              </div>
            </div>

            <div className="lg:w-80 w-full space-y-4">
              <Card className="bg-gradient-card border-border">
                <CardHeader className="pb-2"><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {data.quickStats.map((stat, i) => (
                    <div key={i} className={`flex justify-between items-center py-2 ${i < data.quickStats.length - 1 ? 'border-b border-border' : ''}`}>
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className={`font-semibold ${stat.colorClass || 'text-foreground'}`}>{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {data.promoBanner && (
                <a
                  href={data.promoBanner.href || getAffiliateUrl(data.brokerId, UTM_CONFIGS.REVIEW_HERO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(data.brokerId, "review_banner", "promo_banner")}
                  className="block rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl"
                >
                  <picture>
                    <source srcSet={data.promoBanner.imageWebp} type="image/webp" />
                    <img src={data.promoBanner.imagePng} alt={data.promoBanner.alt} className="w-full h-auto" />
                  </picture>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewHero;
