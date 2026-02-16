import type { LucideIcon } from "lucide-react";

interface TrustFeature {
  icon: LucideIcon;
  text: string;
}

interface ReviewTrustBannerProps {
  features: TrustFeature[];
}

const ReviewTrustBanner = ({ features }: ReviewTrustBannerProps) => {
  return (
    <section className="py-8 bg-success/5 border-y border-success/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center">
          {features.map((feature, i) => (
            <div key={i} className="contents">
              <div className="flex items-center gap-2">
                <feature.icon className={`w-6 h-6 ${i === 0 ? "text-success" : "text-primary"}`} />
                <span className="text-foreground font-medium">{feature.text}</span>
              </div>
              {i < features.length - 1 && <div className="hidden md:block w-px h-6 bg-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewTrustBanner;
