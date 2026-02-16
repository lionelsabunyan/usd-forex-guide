import { Card, CardContent } from "@/components/ui/card";
import type { ReviewRating } from "@/lib/brokerReviewData";

interface ReviewDetailedRatingsProps {
  ratings: ReviewRating[];
}

const ReviewDetailedRatings = ({ ratings }: ReviewDetailedRatingsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Detailed Ratings</h2>
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 space-y-6">
              {ratings.map((rating, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium text-foreground">{rating.label}</span>
                      <p className="text-sm text-muted-foreground">{rating.description}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">{rating.score}/5</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(rating.score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetailedRatings;
