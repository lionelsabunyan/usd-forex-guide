import { useEffect, useState } from "react";
import { X, TrendingUp, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import { cn } from "@/lib/utils";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Top 3 featured brokers: 1. FXGlory, 2. Coinexx, 3. MidasFX
  const topBrokers = [
    brokers.fxglory,
    brokers.coinexx,
    brokers.midasfx,
  ];

  useEffect(() => {
    // Skip if already shown in this session
    if (hasShown || sessionStorage.getItem("exitIntentShown")) {
      return;
    }

    let exitIntentTimeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from top of page (closing tab/window)
      if (e.clientY <= 0 && !hasShown) {
        exitIntentTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }, 100);
      }
    };

    // Mobile: show after 30 seconds of inactivity
    let inactivityTimeout: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      if (!hasShown) {
        inactivityTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }, 30000); // 30 seconds
      }
    };

    // Desktop: exit intent
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: inactivity detection
    document.addEventListener("touchstart", resetInactivityTimer);
    document.addEventListener("scroll", resetInactivityTimer);

    // Start inactivity timer
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
    trackAffiliateClick(brokerId as any, "exit_intent_popup", "open_account", undefined);
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 text-center border-b">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wait! Find Your Perfect Broker
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Don't leave without checking out our top-rated brokers trusted by thousands of US traders
          </p>
        </div>

        {/* Broker cards */}
        <div className="p-6 space-y-4">
          {topBrokers.map((broker, index) => (
            <Card
              key={broker.id}
              className={cn(
                "p-4 hover:shadow-lg transition-shadow border-2",
                index === 0 && "border-primary bg-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <BrokerLogo broker={broker} className="w-14 h-14 flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {broker.name}
                        {index === 0 && (
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            #1 Rated
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span>{broker.regulation}</span>
                        </div>
                        <span>•</span>
                        <span>⭐ {broker.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Min Deposit</div>
                      <div className="font-semibold">{broker.minDepositDisplay}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Leverage</div>
                      <div className="font-semibold">{broker.leverage}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Spreads</div>
                      <div className="font-semibold">{broker.spreads}</div>
                    </div>
                  </div>

                  {/* Top pros */}
                  <div className="mb-3">
                    <ul className="text-sm space-y-1">
                      {broker.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    className={cn(
                      "w-full",
                      index === 0 && "bg-primary hover:bg-primary/90"
                    )}
                    onClick={() => handleBrokerClick(broker.id)}
                    asChild
                  >
                    <a
                      href={getAffiliateUrl(broker.id, "exit_intent_popup")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Open Account with {broker.name}
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
            All brokers accept US clients • Trade with confidence
          </p>
          <button
            onClick={handleClose}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground underline"
          >
            No thanks, I'll browse more
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;
