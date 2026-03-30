import { useState, useEffect } from "react";
import { ArrowRight, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brokers, type BrokerId } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";

interface ReviewStickyDesktopCTAProps {
  brokerId: BrokerId;
  brokerName: string;
}

const ReviewStickyDesktopCTA = ({ brokerId, brokerName }: ReviewStickyDesktopCTAProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const broker = brokers[brokerId];

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed) {
        setVisible(window.scrollY > 500);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="hidden lg:block fixed right-4 top-24 z-40 w-64 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="relative p-4 bg-gradient-hero border-b border-border">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <BrokerLogo broker={broker} className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm leading-tight">{brokerName}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(broker?.rating ?? 0) ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{broker?.rating?.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {broker?.minDepositDisplay && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Min Deposit</span>
              <span className="font-semibold text-foreground">{broker.minDepositDisplay}</span>
            </div>
          )}
          {broker?.leverage && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Max Leverage</span>
              <span className="font-semibold text-foreground">{broker.leverage}</span>
            </div>
          )}
          {broker?.usAccepted && (
            <div className="text-xs text-center py-1 bg-success/10 text-success rounded-lg font-medium">
              🇺🇸 US Clients Accepted
            </div>
          )}

          <Button
            variant="hero"
            size="sm"
            className="w-full group"
            asChild
          >
            <a
              href={getAffiliateUrl(brokerId, UTM_CONFIGS.REVIEW_DESKTOP_STICKY)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick(brokerId, "review_desktop_sticky", "open_account")}
            >
              Open Account <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>
          <p className="text-[10px] text-muted-foreground/60 text-center">CFDs carry risk. Capital at risk.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStickyDesktopCTA;
