import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { reviewedBrokers, type BrokerId } from "@/lib/brokers";
import BrokerLogo from "@/components/BrokerLogo";

interface ReviewRelatedBrokersProps {
  currentBrokerId: BrokerId;
}

const ReviewRelatedBrokers = ({ currentBrokerId }: ReviewRelatedBrokersProps) => {
  // Show 6 other brokers, sorted by rating, excluding current
  const related = reviewedBrokers
    .filter((b) => b.id !== currentBrokerId)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              More Broker Reviews
            </h2>
            <p className="text-muted-foreground">
              Compare other top-rated forex brokers we've reviewed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((broker) => (
              <Link
                key={broker.id}
                to={broker.reviewUrl}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <BrokerLogo broker={broker} className="w-10 h-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {broker.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-xs font-medium text-foreground">{broker.rating?.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground ml-1">{broker.spreads}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/brokers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              View All {reviewedBrokers.length} Broker Reviews
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewRelatedBrokers;
