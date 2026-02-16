import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import type { BrokerId } from "@/lib/brokers";

interface ReviewStickyMobileCTAProps {
  brokerId: BrokerId;
  brokerName: string;
}

const ReviewStickyMobileCTA = ({ brokerId, brokerName }: ReviewStickyMobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
      <Button variant="hero" size="lg" className="w-full group" asChild>
        <a href={getAffiliateUrl(brokerId, UTM_CONFIGS.MOBILE_STICKY)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(brokerId, "review_sticky", "open_account")}>
          Open {brokerName} Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </div>
  );
};

export default ReviewStickyMobileCTA;
