import { AlertTriangle } from "lucide-react";

interface ReviewWarningBannerProps {
  text: string;
}

const ReviewWarningBanner = ({ text }: ReviewWarningBannerProps) => {
  return (
    <section className="py-4 bg-warning/10 border-y border-warning/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm text-warning font-medium">{text}</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewWarningBanner;
