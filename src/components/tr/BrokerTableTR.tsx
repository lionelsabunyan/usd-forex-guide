import { Star, ExternalLink, Gift, Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { brokers, Broker, BrokerId } from "@/lib/brokers";
import { trBrokerInfo, getBonusSummary } from "@/lib/brokersTR";
import BrokerLogo from "../BrokerLogo";
import { trackAffiliateClick } from "@/lib/tracking";

// Türkiye'den hesap açılabilen 7 broker
const TR_BROKERS: BrokerId[] = [
  "fxpro",
  "hfm",
  "xm",
  "exness",
  "fbs",
  "pepperstone",
  "fxtm",
];

const BrokerTableTR = () => {
  // Filter and sort brokers by rating
  const trBrokers = TR_BROKERS
    .map(id => brokers[id])
    .filter(Boolean)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const handleVisitClick = (broker: Broker) => {
    trackAffiliateClick(broker.id, "tr_comparison", "hesap_ac");
  };

  const getAffiliateUrl = (broker: Broker): string => {
    const trInfo = trBrokerInfo[broker.id];
    if (trInfo?.affiliateUrl) {
      return trInfo.affiliateUrl;
    }
    return broker.affiliateUrl || broker.siteUrl;
  };

  return (
    <section id="karsilastirma" className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Broker <span className="text-gradient-gold">Karşılaştırması</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Türkiye'den hesap açılabilen forex brokerlarını karşılaştırın
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block max-w-7xl mx-auto overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary">
                <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">Broker</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Puan</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Min. Depozito</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Kaldıraç</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">Spread</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">
                  <div className="flex items-center justify-center gap-1">
                    <Gift className="w-4 h-4" />
                    Bonus
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">TR Destek</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-foreground">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {trBrokers.map((broker) => {
                const trInfo = trBrokerInfo[broker.id];
                return (
                  <tr
                    key={broker.id}
                    className="border-t border-border transition-colors hover:bg-secondary/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <BrokerLogo broker={broker} className="w-10 h-10 rounded-lg" />
                        <div>
                          <p className="font-semibold text-foreground">{broker.name}</p>
                          <span className="text-xs text-muted-foreground">{broker.regulation}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">{broker.rating?.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-foreground">{broker.minDepositDisplay}</td>
                    <td className="px-4 py-4 text-center text-foreground">{broker.leverage}</td>
                    <td className="px-4 py-4 text-center text-foreground">{broker.spreads}</td>
                    <td className="px-4 py-4 text-center">
                      {trInfo?.hasBonus ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <Gift className="w-3 h-3" />
                          {getBonusSummary(trInfo)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Yok</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {trInfo?.turkishSupport ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/tr/inceleme/${broker.id}`}>
                          <Button variant="outline" size="default" className="h-11">
                            İncele
                          </Button>
                        </Link>
                        <a
                          href={getAffiliateUrl(broker)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleVisitClick(broker)}
                        >
                          <Button size="default" className="gap-1 bg-primary hover:bg-primary/90 h-11">
                            Hesap Aç
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4 max-w-lg mx-auto">
          {trBrokers.map((broker) => {
            const trInfo = trBrokerInfo[broker.id];
            return (
              <div
                key={broker.id}
                className="bg-card rounded-xl border border-border p-4 shadow-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BrokerLogo broker={broker} className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{broker.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{broker.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  {trInfo?.hasBonus && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Gift className="w-3 h-3" />
                      Bonus
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Min. Depozito</p>
                    <p className="font-medium text-foreground text-sm">{broker.minDepositDisplay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Kaldıraç</p>
                    <p className="font-medium text-foreground text-sm">{broker.leverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Spread</p>
                    <p className="font-medium text-foreground text-sm">{broker.spreads}</p>
                  </div>
                </div>

                {trInfo?.hasBonus && trInfo.bonusDetails && (
                  <div className="mb-4 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      {trInfo.bonusDetails}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link to={`/tr/inceleme/${broker.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      İncele
                    </Button>
                  </Link>
                  <a
                    href={getAffiliateUrl(broker)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleVisitClick(broker)}
                    className="flex-1"
                  >
                    <Button className="w-full gap-1 bg-primary hover:bg-primary/90">
                      Hesap Aç
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Uyarısı */}
        <div className="mt-8 max-w-4xl mx-auto">
          <p className="text-xs text-center text-muted-foreground">
            ⚠️ Forex ve CFD işlemleri yüksek risk taşır. Perakende yatırımcıların %74-89'u bu ürünlerde para kaybeder.
            Kaybetmeyi göze alabileceğinizden fazlasını yatırmayın.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokerTableTR;
