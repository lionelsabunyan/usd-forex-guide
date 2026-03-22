import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { useExperiment } from "@/hooks/useExperiment";
import { EXP_CTA_COLOR, EXP_CTA_COPY } from "@/lib/abtest";
import type { BrokerId } from "@/lib/brokers";

const CTA_COLOR_CLASSES: Record<string, string> = {
  control: "",
  green: "!from-emerald-500 !to-green-600 hover:!from-emerald-600 hover:!to-green-700",
  blue: "!from-blue-500 !to-indigo-600 hover:!from-blue-600 hover:!to-indigo-700",
};

interface ReviewStickyMobileCTAProps {
  brokerId: BrokerId;
  brokerName: string;
}

const ReviewStickyMobileCTA = ({ brokerId, brokerName }: ReviewStickyMobileCTAProps) => {
  const colorExp = useExperiment(EXP_CTA_COLOR);
  const copyExp = useExperiment(EXP_CTA_COPY);

  const ctaColorClass = CTA_COLOR_CLASSES[colorExp.variant] || "";
  const ctaCopyText =
    copyExp.variant === "urgency"
      ? "Start Trading Now"
      : copyExp.variant === "benefit"
        ? `Get ${brokerName}'s Best Spreads`
        : `Open ${brokerName} Account`;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border lg:hidden z-50">
      <Button variant="hero" size="lg" className={`w-full group ${ctaColorClass}`} asChild>
        <a href={getAffiliateUrl(brokerId, UTM_CONFIGS.MOBILE_STICKY)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(brokerId, "review_sticky", "open_account")}>
          {ctaCopyText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </div>
  );
};

export default ReviewStickyMobileCTA;
