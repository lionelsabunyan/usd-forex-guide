import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";

/**
 * Mobile Sticky Footer CTA
 * Shows a fixed CTA button at the bottom of the screen on mobile devices
 * Expected conversion increase: 15-25%
 */
const MobileStickyFooter = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <Button
        variant="hero"
        size="lg"
        className="w-full"
        asChild
      >
        <a
          href={getAffiliateUrl("fxglory", UTM_CONFIGS.MOBILE_STICKY)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAffiliateClick("fxglory", "mobile_sticky", "get_started")}
        >
          Start Trading Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default MobileStickyFooter;
