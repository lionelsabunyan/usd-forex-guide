import { useState, useEffect, useCallback } from "react";
import { X, Gift, TrendingUp, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

/**
 * Exit Intent Popup
 * Shows a special offer popup when user moves mouse towards browser chrome (exit intent)
 * Expected conversion recovery: 5-15% of abandoning visitors
 */
const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse is leaving from the top of the viewport
    if (e.clientY <= 0 && !hasTriggered) {
      // Check if user has seen this popup before (within 24 hours)
      const lastSeen = localStorage.getItem("exitPopupLastSeen");
      const now = Date.now();

      if (!lastSeen || now - parseInt(lastSeen) > 24 * 60 * 60 * 1000) {
        setIsVisible(true);
        setHasTriggered(true);
        localStorage.setItem("exitPopupLastSeen", now.toString());

        // Track popup view
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "exit_intent_popup_view", {
            page_path: window.location.pathname,
          });
        }
      }
    }
  }, [hasTriggered]);

  useEffect(() => {
    // Only add listener on desktop (no exit intent on mobile)
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);

    // Track popup close
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exit_intent_popup_close", {
        page_path: window.location.pathname,
      });
    }
  };

  const handleCtaClick = () => {
    trackAffiliateClick("fxglory", "exit_intent_popup", "special_offer");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full animate-in zoom-in-95 fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-gold p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            Wait! Don't Leave Empty-Handed
          </h2>
          <p className="text-white/90 text-sm">
            Get exclusive benefits when you start trading today
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Up to 1:3000 Leverage</h4>
                <p className="text-xs text-muted-foreground">Maximize your trading potential</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">$1 Minimum Deposit</h4>
                <p className="text-xs text-muted-foreground">Start trading with any budget</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Instant Crypto Withdrawals</h4>
                <p className="text-xs text-muted-foreground">Fast & secure fund access</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              asChild
            >
              <a
                href={getAffiliateUrl("fxglory", UTM_CONFIGS.EXIT_INTENT)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
              >
                Claim Your Bonus Now
              </a>
            </Button>

            <button
              onClick={handleClose}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              No thanks, I'll pass on this offer
            </button>
          </div>

          {/* Trust Badge */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Join 50,000+ traders who trust FXGlory
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
