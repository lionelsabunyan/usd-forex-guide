import { Check, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import type { BrokerId } from "@/lib/brokers";

interface ReviewProsAndConsProps {
  pros: string[];
  cons: string[];
  brokerId?: BrokerId;
  brokerName?: string;
}

const ReviewProsAndCons = ({ pros, cons, brokerId, brokerName }: ReviewProsAndConsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-success/30">
              <CardHeader><CardTitle className="flex items-center gap-2 text-success"><Check className="w-6 h-6" />Advantages</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-success shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-destructive/30">
              <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" />Disadvantages</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="text-destructive shrink-0 mt-0.5">✕</span><span className="text-muted-foreground">{con}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {brokerId && brokerName && (
            <div className="mt-10">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Despite the limitations above,</span> {brokerName} remains a top choice — verified by thousands of real trader reviews and consistent trading conditions.
                </p>
              </div>
              <div className="text-center">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a
                    href={getAffiliateUrl(brokerId, UTM_CONFIGS.REVIEW_PROS_CONS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick(brokerId, "pros_cons", "open_account")}
                  >
                    Start Trading – Claim Welcome Bonus
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">US Clients Accepted · Takes 2 minutes · No hidden fees</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewProsAndCons;
