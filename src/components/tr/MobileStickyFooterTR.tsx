import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { trBrokerInfo } from "@/lib/brokersTR";
import { trackTRBrokerClick } from "@/lib/trackingTR";

/**
 * Mobile Sticky Footer CTA - Turkish Version
 * Shows a fixed CTA button at the bottom of the screen on mobile devices
 * Links to XM for Turkish users
 */
const MobileStickyFooterTR = () => {
  const xmUrl = trBrokerInfo.xm?.affiliateUrl || "https://www.xm.com";

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <Button variant="hero" size="lg" className="w-full" asChild>
        <a
          href={xmUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTRBrokerClick("xm", "mobile_sticky", "baslat")}
        >
          Şimdi İşlem Yap
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
  );
};

export default MobileStickyFooterTR;
