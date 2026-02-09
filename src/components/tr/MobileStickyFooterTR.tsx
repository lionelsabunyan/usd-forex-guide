import { ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";

/**
 * Mobile Sticky Footer CTA - Turkish Version
 * Shows HFM (best Turkish broker) affiliate link
 * Only displays on Turkish homepage to reduce UX friction
 */
const MobileStickyFooterTR = () => {
  const location = useLocation();

  // Only show on Turkish homepage
  const shouldShow = location.pathname === "/tr";

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <Button
        variant="hero"
        size="lg"
        className="w-full"
        asChild
      >
        <a
          href="https://www.hf-anatbroker.com/en/?refid=30503439"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Track click if analytics available
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'affiliate_click', {
                broker: 'hfm',
                location: 'mobile_sticky_tr',
                action: 'hesap_ac'
              });
            }
          }}
        >
          Hemen Hesap Aç
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default MobileStickyFooterTR;
