import { Gift, TrendingUp, Info, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackAffiliateClick } from "@/lib/tracking";

export interface BonusOffer {
  title: string;
  amount: string;
  type: "deposit" | "no-deposit" | "welcome" | "cashback" | "vps";
  description: string;
  requirements?: string[];
  minDeposit?: string;
  maxBonus?: string;
  termsUrl?: string;
  highlighted?: boolean;
}

interface BonusCardProps {
  offer: BonusOffer;
  brokerName: string;
  affiliateUrl: string;
  className?: string;
}

const BonusCard = ({ offer, brokerName, affiliateUrl, className }: BonusCardProps) => {
  const handleClaimBonus = () => {
    // Track bonus click with detailed information
    const brokerId = brokerName.toLowerCase().replace(/[^a-z0-9]/g, '');
    trackAffiliateClick(
      brokerId as any,
      "bonus_card",
      "claim_bonus",
      undefined
    );
  };
  const typeColors = {
    deposit: "bg-green-500/10 text-green-700 border-green-500/20",
    "no-deposit": "bg-blue-500/10 text-blue-700 border-blue-500/20",
    welcome: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    cashback: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    vps: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
  };

  const typeLabels = {
    deposit: "Deposit Bonus",
    "no-deposit": "No Deposit",
    welcome: "Welcome Bonus",
    cashback: "Cashback",
    vps: "Free VPS",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover:shadow-lg",
        offer.highlighted && "border-2 border-primary shadow-md",
        className
      )}
    >
      {offer.highlighted && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
          BEST OFFER
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              offer.highlighted ? "bg-primary/10" : "bg-secondary"
            )}>
              <Gift className={cn(
                "w-5 h-5",
                offer.highlighted ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <CardTitle className="text-lg">{offer.title}</CardTitle>
              <Badge
                variant="outline"
                className={cn("mt-1", typeColors[offer.type])}
              >
                {typeLabels[offer.type]}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Amount Display */}
        <div className="flex items-baseline gap-2">
          <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
          <div>
            <div className="text-2xl font-bold text-green-600">
              {offer.amount}
            </div>
            {offer.maxBonus && (
              <div className="text-xs text-muted-foreground">
                Maximum: {offer.maxBonus}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {offer.description}
        </p>

        {/* Requirements */}
        {offer.requirements && offer.requirements.length > 0 && (
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Info className="w-3.5 h-3.5" />
              <span>Requirements:</span>
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {offer.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Min Deposit */}
        {offer.minDeposit && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t">
            <span className="text-muted-foreground">Min Deposit:</span>
            <span className="font-semibold">{offer.minDeposit}</span>
          </div>
        )}

        {/* Claim Bonus CTA */}
        <Button
          variant={offer.highlighted ? "default" : "outline"}
          size="lg"
          className="w-full mt-2"
          asChild
        >
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClaimBonus}
            className="flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Claim {offer.title}
          </a>
        </Button>

        {/* Terms Link */}
        {offer.termsUrl && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs h-8 mt-1"
            asChild
          >
            <a
              href={offer.termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              View Terms & Conditions
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BonusCard;
