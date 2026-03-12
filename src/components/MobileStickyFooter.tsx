import { ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS, IB_BROKERS } from "@/lib/tracking";
import { BrokerId } from "@/lib/brokers";

// Map review path slugs to broker IDs (US reviews)
const REVIEW_PATH_MAP: Record<string, BrokerId> = {
  fxglory: "fxglory",
  hankotrade: "hankotrade",
  midasfx: "midasfx",
  n1cm: "n1cm",
  coinexx: "coinexx",
};

// TR review slug → broker ID mapping
const TR_REVIEW_PATH_MAP: Record<string, BrokerId> = {
  hfm: "hfm",
  xm: "xm",
  exness: "exness",
  fbs: "fbs",
  pepperstone: "pepperstone",
  fxtm: "fxtm",
  fxpro: "fxpro",
};

// TR sayfaları için varsayılan IB broker (en iyi conversion: FXGlory)
const TR_DEFAULT_BROKER: BrokerId = "fxglory";
const US_DEFAULT_BROKER: BrokerId = "hankotrade";

/**
 * Mobile Sticky Footer CTA
 * - US ana sayfa & /compare: Hankotrade
 * - US IB review sayfaları: ilgili broker
 * - TR ana sayfa & /tr/inceleme/*: FXGlory (mobile_sticky en iyi performer)
 * - N1CM review: N1CM
 */
const MobileStickyFooter = () => {
  const location = useLocation();
  const path = location.pathname;

  const isUSHomepage = path === "/";
  const isUSCompare = path.startsWith("/compare");
  const isTRPage = path.startsWith("/tr");
  const isTRHome = path === "/tr" || path === "/tr/";

  const usReviewMatch = path.match(/^\/review\/([^/]+)/);
  const trReviewMatch = path.match(/^\/tr\/inceleme\/([^/]+)/);

  const usReviewSlug = usReviewMatch?.[1] ?? null;
  const trReviewSlug = trReviewMatch?.[1] ?? null;

  const usReviewBrokerId = usReviewSlug ? REVIEW_PATH_MAP[usReviewSlug] : null;
  const trReviewBrokerId = trReviewSlug ? TR_REVIEW_PATH_MAP[trReviewSlug] : null;

  const shouldShow =
    isUSHomepage || isUSCompare || !!usReviewMatch || isTRPage;

  if (!shouldShow) return null;

  // Broker seçimi
  let activeBrokerId: BrokerId;
  let clickLocation: string;
  let buttonLabel: string;

  if (isTRPage) {
    // TR sayfaları: IB broker yoksa FXGlory default
    activeBrokerId = trReviewBrokerId && IB_BROKERS.includes(trReviewBrokerId)
      ? trReviewBrokerId
      : TR_DEFAULT_BROKER;
    clickLocation = trReviewSlug ? `mobile_sticky_tr_${trReviewSlug}` : "mobile_sticky_tr_home";
    buttonLabel = isTRHome ? "En İyi Broker'ı Gör" : "Hesap Aç";
  } else {
    // US sayfaları
    activeBrokerId = usReviewBrokerId && IB_BROKERS.includes(usReviewBrokerId)
      ? usReviewBrokerId
      : US_DEFAULT_BROKER;
    clickLocation = usReviewSlug ? `mobile_sticky_review_${usReviewSlug}` : "mobile_sticky";
    buttonLabel = "Start Trading Now";
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
          href={getAffiliateUrl(activeBrokerId, UTM_CONFIGS.MOBILE_STICKY)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAffiliateClick(activeBrokerId, clickLocation, "get_started")}
        >
          {buttonLabel}
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default MobileStickyFooter;
