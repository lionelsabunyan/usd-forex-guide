import { Star, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CommunityFeedback } from "@/lib/brokerReviewData";

interface ReviewCommunityFeedbackProps {
  feedback: CommunityFeedback;
  trustpilotRating?: number;
  trustpilotReviews?: number;
}

const ReviewCommunityFeedback = ({ feedback, trustpilotRating, trustpilotReviews }: ReviewCommunityFeedbackProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Community Feedback</h2>
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              {trustpilotRating && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-foreground">{trustpilotRating}</div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(trustpilotRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                    {trustpilotReviews && (
                      <p className="text-sm text-muted-foreground">Based on {trustpilotReviews.toLocaleString()}+ Trustpilot reviews</p>
                    )}
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-success" />Common Praise</h4>
                  <ul className="space-y-2">
                    {feedback.positiveThemes.map((theme, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-success">+</span>{theme}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><XCircle className="w-5 h-5 text-destructive" />Common Concerns</h4>
                  <ul className="space-y-2">
                    {feedback.negativeThemes.map((theme, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-destructive">-</span>{theme}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewCommunityFeedback;
