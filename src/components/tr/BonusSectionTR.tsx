import { Gift, TrendingUp, ExternalLink, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brokers } from "@/lib/brokers";
import { trBrokerInfo, getBonusOffers } from "@/lib/brokersTR";
import { trackTRBrokerClick } from "@/lib/trackingTR";
import BrokerLogo from "../BrokerLogo";
import { cn } from "@/lib/utils";

// Featured brokers with bonuses
const BONUS_BROKERS = ["xm", "hfm", "fxpro"];

const BonusSectionTR = () => {
  const handleClaimBonus = (brokerId: string) => {
    trackTRBrokerClick(brokerId as any, "bonus_section", "claim_bonus");
  };

  // Get brokers with bonuses
  const bonusBrokers = BONUS_BROKERS
    .map(id => ({
      ...brokers[id as keyof typeof brokers],
      trInfo: trBrokerInfo[id],
      offers: getBonusOffers(id)
    }))
    .filter(b => b.offers.length > 0);

  if (bonusBrokers.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 mb-4">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">Özel Bonuslar</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            En Yüksek <span className="text-gradient-gold">Bonuslar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yatırımsız bonuslar ve hoşgeldin paketleriyle işlem sermayenizi artırın
          </p>
        </div>

        {/* Bonus Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {bonusBrokers.map((broker, index) => {
            const mainOffer = broker.offers[0]; // En önemli bonus
            const hasNoDeposit = mainOffer?.type === "no-deposit";

            return (
              <Card
                key={broker.id}
                className={cn(
                  "relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]",
                  hasNoDeposit && "border-2 border-amber-500 shadow-lg"
                )}
              >
                {hasNoDeposit && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                    🎁 YATIRIM GEREKMİYOR
                  </div>
                )}

                {/* Broker Header */}
                <div className="p-6 pb-4 border-b bg-secondary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <BrokerLogo broker={broker} className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{broker.name}</h3>
                      <p className="text-xs text-muted-foreground">⭐ {broker.rating}/5</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "w-full justify-center py-1.5",
                      hasNoDeposit
                        ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                        : "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                    )}
                  >
                    {broker.trInfo.bonusDetails}
                  </Badge>
                </div>

                {/* Main Offer */}
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div className="text-3xl font-bold text-green-600">
                        {mainOffer.amount}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {mainOffer.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mainOffer.description}
                    </p>
                  </div>

                  {/* Additional Offers */}
                  {broker.offers.length > 1 && (
                    <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs font-medium text-foreground mb-2">+ Ek Bonuslar:</p>
                      <ul className="space-y-1">
                        {broker.offers.slice(1, 3).map((offer, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{offer.title}: {offer.amount}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <Button
                    className={cn(
                      "w-full",
                      hasNoDeposit && "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    )}
                    size="lg"
                    asChild
                  >
                    <a
                      href={broker.trInfo.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleClaimBonus(broker.id)}
                      className="flex items-center justify-center gap-2"
                    >
                      <Gift className="w-4 h-4" />
                      {hasNoDeposit ? "Hemen Al" : "Bonusu Talep Et"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>

                  {/* Requirements */}
                  {mainOffer.requirements && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Koşullar:</p>
                      <ul className="space-y-0.5">
                        {mainOffer.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="mt-0.5">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
            * Bonuslar şart ve koşullara tabidir. Bonus fonlarıyla işlem yapmak risk içerir.
            Katılmadan önce tüm şartları okuyunuz. Bonus kullanılabilirliği bölgeye göre değişebilir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusSectionTR;
