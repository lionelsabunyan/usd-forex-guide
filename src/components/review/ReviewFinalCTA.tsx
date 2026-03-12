import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import type { BrokerId } from "@/lib/brokers";

interface ReviewFinalCTAProps {
  brokerId: BrokerId;
  brokerName: string;
  ctaDescription: string;
  riskWarning: string;
  usAccepted?: boolean;
}

const ReviewFinalCTA = ({ brokerId, brokerName, ctaDescription, riskWarning, usAccepted }: ReviewFinalCTAProps) => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {usAccepted && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-4">
              🇺🇸 US Clients Accepted
            </div>
          )}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Open Your {brokerName} Account Today</h2>
          <p className="text-lg text-muted-foreground mb-8">{ctaDescription}</p>
          <div className="flex justify-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={getAffiliateUrl(brokerId, UTM_CONFIGS.REVIEW_BOTTOM)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(brokerId, "review_bottom", "open_account")}>
                Open Account – Takes 2 Minutes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Takes 2 minutes · No hidden fees · Crypto deposits accepted</p>
          <p className="text-xs text-muted-foreground/60 mt-4">{riskWarning}</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewFinalCTA;
