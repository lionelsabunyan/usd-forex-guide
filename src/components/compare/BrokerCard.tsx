import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Broker, getAverageScore } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";

interface BrokerCardProps {
  broker: Broker;
  rank?: number;
}

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  const percentage = (score / 5) * 100;
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground w-32 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium w-6 text-right">{score.toFixed(1)}</span>
    </div>
  );
};

const BrokerCard = ({ broker, rank }: BrokerCardProps) => {
  const avgScore = getAverageScore(broker);

  const handleCtaClick = () => {
    trackAffiliateClick(broker.id, "compare_page", "open_account");
  };

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all ${broker.featured ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}>
      {/* Header with rank and rating */}
      <Link to={broker.reviewUrl} className="block">
        <div className="relative">
        {rank && (
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10">
            {rank}
          </div>
        )}
        {broker.featured && (
          <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide z-10">
            Editor's Choice
          </div>
        )}

        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <BrokerLogo broker={broker} className="w-14 h-14 rounded-xl" />
              <div>
                <h3 className="font-semibold text-lg">{broker.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{broker.headquarters}</span>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">{broker.rating.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">
                out of 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Regulation:</span>
            <span className="font-medium truncate">{broker.regulation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Leverage:</span>
            <span className="font-medium">{broker.leverage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Min:</span>
            <span className="font-medium">{broker.minDepositDisplay}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-4 h-4 text-muted-foreground text-center">📊</span>
            <span className="text-muted-foreground">Spread:</span>
            <span className="font-medium">{broker.spreads}</span>
          </div>
        </div>
      </div>

      {/* Pros */}
      <div className="px-6 pb-4">
        <div className="space-y-1.5">
          {broker.pros.slice(0, 3).map((pro, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{pro}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score Bars */}
      <div className="px-6 pb-4 space-y-2">
        <ScoreBar label="Trading Conditions" score={broker.scores.tradingConditions} />
        <ScoreBar label="Platform & Tools" score={broker.scores.platformTools} />
        <ScoreBar label="Deposit/Withdrawal" score={broker.scores.depositWithdrawal} />
        <ScoreBar label="Trust & Reputation" score={broker.scores.trustReputation} />
      </div>

        {/* US Accepted Badge */}
        <div className="px-6 pb-4">
          {broker.usAccepted ? (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950 rounded-lg px-3 py-2">
              <Check className="w-4 h-4" />
              <span className="font-medium">US Clients Accepted</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2">
              <span className="font-medium">US Clients NOT Accepted</span>
            </div>
          )}
        </div>
      </Link>

      {/* CTA */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex gap-2">
          {broker.affiliateUrl ? (
            <Button
              variant={broker.featured ? "destructive" : "default"}
              className="flex-1"
              asChild
            >
              <a
                href={getAffiliateUrl(broker.id, UTM_CONFIGS.COMPARE_PAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
              >
                Open Account
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button
              variant={broker.featured ? "destructive" : "default"}
              className="flex-1"
              asChild
            >
              <a
                href={broker.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to={broker.reviewUrl}>Review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;
