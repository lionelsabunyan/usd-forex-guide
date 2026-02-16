import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import type { BrokerId } from "@/lib/brokers";
import type { AccountOpeningStep } from "@/lib/brokerReviewData";

interface ReviewAccountStepsProps {
  brokerId: BrokerId;
  brokerName: string;
  steps: AccountOpeningStep[];
}

const ReviewAccountSteps = ({ brokerId, brokerName, steps }: ReviewAccountStepsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              How to Open a {brokerName} Account
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with {brokerName} in minutes. Follow these simple steps to begin trading.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-gradient-card border-border h-full hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs text-primary font-medium mb-2">Step {step.step}</div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                    <div className="text-xs text-primary font-medium">⏱ {step.time}</div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={getAffiliateUrl(brokerId, UTM_CONFIGS.REVIEW_HERO)} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(brokerId, "review_steps", "open_account")}>
                Open {brokerName} Account Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAccountSteps;
