import { useEffect, useState } from "react";
import { X, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trBrokerInfo } from "@/lib/brokersTR";
import { brokers } from "@/lib/brokers";
import { trackTRBrokerClick } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { cn } from "@/lib/utils";

const ExitIntentPopupTR = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Top 3 brokers for TR: HFM, FXPro, XM
  const topBrokerIds = ["hfm", "fxpro", "xm"];
  const topBrokers = topBrokerIds.map(id => ({
    ...brokers[id as keyof typeof brokers],
    trInfo: trBrokerInfo[id]
  }));

  useEffect(() => {
    if (hasShown || sessionStorage.getItem("exitIntentShownTR")) {
      return;
    }

    let exitIntentTimeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        exitIntentTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShownTR", "true");
        }, 100);
      }
    };

    let inactivityTimeout: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      if (!hasShown) {
        inactivityTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShownTR", "true");
        }, 30000);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchstart", resetInactivityTimer);
    document.addEventListener("scroll", resetInactivityTimer);
    resetInactivityTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", resetInactivityTimer);
      document.removeEventListener("scroll", resetInactivityTimer);
      clearTimeout(exitIntentTimeout);
      clearTimeout(inactivityTimeout);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBrokerClick = (brokerId: string) => {
    trackTRBrokerClick(brokerId as any, "exit_intent_popup", "open_account");
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-background border-2 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 text-center border-b bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-500/20 border-2 border-green-500">
            <Gift className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-green-900 dark:text-green-100">
            🎁 En Yüksek Bonuslar Burada!
          </h2>
          <p className="text-green-700 dark:text-green-300 text-sm md:text-base max-w-md mx-auto font-medium">
            $30 Yatırımsız Bonus + %100 İlk Yatırım Bonusu - Şimdi Kaçırma!
          </p>
        </div>

        {/* Broker cards */}
        <div className="p-6 space-y-3">
          {topBrokers.map((broker, index) => (
            <Card
              key={broker.id}
              className={cn(
                "p-4 hover:shadow-lg transition-shadow border-2",
                index === 0 && "border-primary bg-primary/5"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Logo */}
                <BrokerLogo broker={broker} className="w-12 h-12 flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-2">
                        {broker.name}
                        {index === 0 && (
                          <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                            #1
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>⭐ {broker.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Bonus highlight - ÖN PLANDA */}
                  {broker.trInfo.hasBonus && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-green-600 rounded-lg shadow-md">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Gift className="w-4 h-4" />
                        <span>{broker.trInfo.bonusDetails}</span>
                      </div>
                    </div>
                  )}

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Min. Yatırım</div>
                      <div className="font-semibold">{broker.minDepositDisplay}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Kaldıraç</div>
                      <div className="font-semibold">{broker.leverage}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="sm"
                    className={cn(
                      "w-full text-xs h-8",
                      index === 0 && "bg-primary hover:bg-primary/90"
                    )}
                    onClick={() => handleBrokerClick(broker.id)}
                    asChild
                  >
                    <a
                      href={broker.trInfo.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {broker.trInfo.hasBonus ? "Bonusu Al" : "Hesap Aç"}
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            Tüm brokerlar Türkiye'den trader kabul eder
          </p>
          <button
            onClick={handleClose}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground underline"
          >
            Hayır teşekkürler, daha fazla göz atmak istiyorum
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ExitIntentPopupTR;
