import { Gift } from "lucide-react";
import BonusCard, { BonusOffer } from "./BonusCard";

interface BonusSectionProps {
  offers: BonusOffer[];
  brokerName: string;
  affiliateUrl: string;
}

const BonusSection = ({ offers, brokerName, affiliateUrl }: BonusSectionProps) => {
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-secondary/30 rounded-2xl px-6 my-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Current Promotions</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            {brokerName} Bonuses & Promotions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take advantage of these exclusive offers to maximize your trading potential
          </p>
        </div>

        {/* Bonus Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <BonusCard
              key={index}
              offer={offer}
              brokerName={brokerName}
              affiliateUrl={affiliateUrl}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            * Bonuses are subject to terms and conditions. Trading bonus funds involves risk.
            Please read full terms before participating.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
