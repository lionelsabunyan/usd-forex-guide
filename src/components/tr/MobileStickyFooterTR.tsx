import { ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { trackTRBrokerClick } from "@/lib/trackingTR";
import { trBrokerInfo } from "@/lib/brokersTR";
import { brokers, BrokerId } from "@/lib/brokers";

const DEFAULT_BROKER: BrokerId = "fxpro";
const DEFAULT_AFFILIATE_URL = "/go/fxpro";

/**
 * Mobile Sticky Footer CTA - Turkish Version
 * Shows affiliate CTA on homepage and all review pages
 * On review pages, shows that page's broker; on homepage shows FXPro
 */
const MobileStickyFooterTR = () => {
  const location = useLocation();

  const isHomepage = location.pathname === "/tr";
  const reviewMatch = location.pathname.match(/^\/tr\/inceleme\/(.+)$/);
  const shouldShow = isHomepage || !!reviewMatch;

  if (!shouldShow) return null;

  const rawId = reviewMatch ? reviewMatch[1] : "";
  const brokerId: BrokerId = (rawId in brokers) ? rawId as BrokerId : DEFAULT_BROKER;
  const trInfo = trBrokerInfo[brokerId];
  const affiliateUrl = trInfo?.affiliateUrl || DEFAULT_AFFILIATE_URL;
  const brokerLabel = trInfo ? brokerId.toUpperCase() : DEFAULT_BROKER.toUpperCase();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <Button
        variant="hero"
        size="lg"
        className="w-full"
        asChild
      >
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTRBrokerClick(brokerId, "mobile_sticky_tr", "hesap_ac")}
        >
          {reviewMatch ? `${brokerLabel}'de Hesap Aç` : "Hemen Hesap Aç"}
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default MobileStickyFooterTR;
