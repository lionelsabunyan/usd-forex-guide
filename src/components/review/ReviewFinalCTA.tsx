import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { Link } from "react-router-dom";
import type { BrokerId } from "@/lib/brokers";

interface ReviewFinalCTAProps {
  brokerId: BrokerId;
  brokerName: string;
  ctaDescription: string;
  riskWarning: string;
}

const ReviewFinalCTA = ({ brokerId, brokerName, ctaDescription, riskWarning }: ReviewFinalCTAProps) => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with {brokerName}?</h2>
          <p className="text-lg text-muted-foreground mb-8">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={getAffiliateUrl(brokerId, UTM_CONFIGS.REVIEW_BOTTOM)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(brokerId, "review_bottom", "open_account")}>
                Open {brokerName} Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">{riskWarning}</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewFinalCTA;
