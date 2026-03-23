import { useEffect, useState, useCallback, useRef } from "react";
import { TrendingUp, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";
import { getVariant, trackExposure, type Experiment } from "@/lib/abtest";
import BrokerLogo from "@/components/BrokerLogo";
import { cn } from "@/lib/utils";

// ── A/B Test: Exit Intent CTA copy ─────────────────────────────────────────

export const EXP_EXIT_CTA: Experiment<"control" | "quiz" | "urgency"> = {
  id: "exit_cta_v1",
  variants: ["control", "quiz", "urgency"] as const,
};

const CTA_VARIANTS = {
  control: {
    heading: "Wait! Find Your Perfect Broker",
    subheading:
      "Don't leave without checking out our top-rated brokers trusted by thousands of US traders",
    dismissText: "No thanks, I'll browse more",
  },
  quiz: {
    heading: "Not Sure Which Broker Is Right for You?",
    subheading:
      "Take our 60-second Broker Finder Quiz and get a personalized recommendation",
    dismissText: "Maybe later",
  },
  urgency: {
    heading: "Before You Go — Compare Top US Brokers",
    subheading:
      "Thousands of traders opened accounts this month. See which broker fits your style",
    dismissText: "I'll come back later",
  },
} as const;

// ── GA4 helper ──────────────────────────────────────────────────────────────

const GA_MEASUREMENT_ID = "G-P860PCCF1T";

function trackPopupEvent(
  eventName: "popup_shown" | "popup_clicked" | "popup_dismissed",
  extra?: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  const payload = { send_to: GA_MEASUREMENT_ID, popup_type: "exit_intent", ...extra };

  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, payload);
  }
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: eventName, ...payload });
  }
  // Clarity custom tag
  if ((window as any).clarity) {
    (window as any).clarity("set", "exit_popup", eventName);
  }
}

// ── Min time on site (ms) ───────────────────────────────────────────────────

const MIN_SITE_TIME_MS = 30_000;
const STORAGE_KEY = "exitIntentShown";

// ── Component ───────────────────────────────────────────────────────────────

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const pageLoadTime = useRef(Date.now());

  // Top 3 featured brokers
  const topBrokers = [brokers.fxglory, brokers.coinexx, brokers.midasfx];

  // A/B variant (stable per user via cookie)
  const variantResult = getVariant(EXP_EXIT_CTA);
  const copy = CTA_VARIANTS[variantResult.variant];

  const showPopup = useCallback(() => {
    if (shownRef.current) return;
    // Enforce 30 s minimum on site
    if (Date.now() - pageLoadTime.current < MIN_SITE_TIME_MS) return;

    shownRef.current = true;
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(true);
    trackExposure(variantResult);
    trackPopupEvent("popup_shown", { variant: variantResult.variant });
  }, [variantResult]);

  useEffect(() => {
    // Already shown in this browser session (persisted via localStorage)
    if (localStorage.getItem(STORAGE_KEY)) {
      shownRef.current = true;
      return;
    }

    // ── Desktop: mouse leaves viewport from top ──
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) showPopup();
    };

    // ── Mobile: rapid scroll-up near top of page ──
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentY;
        // Triggered when user scrolls up ≥150 px while near the top half
        if (scrollUpDistance > 150 && currentY < window.innerHeight) {
          showPopup();
        }
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup]);

  const handleDismiss = () => {
    setOpen(false);
    trackPopupEvent("popup_dismissed", { variant: variantResult.variant });
  };

  const handleBrokerClick = (brokerId: string) => {
    trackAffiliateClick(
      brokerId as any,
      "exit_intent_popup",
      "open_account",
      undefined,
    );
    trackPopupEvent("popup_clicked", {
      variant: variantResult.variant,
      broker_id: brokerId,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 text-center border-b">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 mx-auto">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            {copy.heading}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base max-w-md mx-auto">
            {copy.subheading}
          </DialogDescription>
        </DialogHeader>

        {/* Broker cards */}
        <div className="p-6 space-y-4">
          {topBrokers.map((broker, index) => (
            <Card
              key={broker.id}
              className={cn(
                "p-4 hover:shadow-lg transition-shadow border-2",
                index === 0 && "border-primary bg-primary/5",
              )}
            >
              <div className="flex items-start gap-4">
                <BrokerLogo
                  broker={broker}
                  className="w-14 h-14 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {broker.name}
                        {index === 0 && (
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground"
                          >
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
                      <div className="text-muted-foreground text-xs">
                        Min Deposit
                      </div>
                      <div className="font-semibold">
                        {broker.minDepositDisplay}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">
                        Leverage
                      </div>
                      <div className="font-semibold">{broker.leverage}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">
                        Spreads
                      </div>
                      <div className="font-semibold">{broker.spreads}</div>
                    </div>
                  </div>

                  {/* Top pros */}
                  <div className="mb-3">
                    <ul className="text-sm space-y-1">
                      {broker.pros.slice(0, 2).map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
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
                      index === 0 && "bg-primary hover:bg-primary/90",
                    )}
                    onClick={() => handleBrokerClick(broker.id)}
                    asChild
                  >
                    <a
                      href={getAffiliateUrl(broker.id, {
                        source: "exit_intent",
                        medium: "popup",
                        campaign: "exit_intent_popup",
                        content: `broker_${index + 1}`,
                      })}
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
            onClick={handleDismiss}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground underline min-h-[44px] px-4 inline-flex items-center"
          >
            {copy.dismissText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
