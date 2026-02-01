import { Quote, TrendingUp, DollarSign, Shield, Clock } from "lucide-react";

type FactType = "stat" | "quote" | "money" | "regulation" | "time";

interface QuotableFactProps {
  fact: string;
  source?: string;
  type?: FactType;
  className?: string;
}

const iconMap: Record<FactType, typeof Quote> = {
  stat: TrendingUp,
  quote: Quote,
  money: DollarSign,
  regulation: Shield,
  time: Clock,
};

const colorMap: Record<FactType, string> = {
  stat: "border-blue-500/30 bg-blue-500/5",
  quote: "border-primary/30 bg-primary/5",
  money: "border-green-500/30 bg-green-500/5",
  regulation: "border-orange-500/30 bg-orange-500/5",
  time: "border-purple-500/30 bg-purple-500/5",
};

const iconColorMap: Record<FactType, string> = {
  stat: "text-blue-500",
  quote: "text-primary",
  money: "text-green-500",
  regulation: "text-orange-500",
  time: "text-purple-500",
};

/**
 * QuotableFact - GEO-optimized component for AI-friendly content
 * AI search engines love quotable, factual statements with clear sources
 */
const QuotableFact = ({ fact, source, type = "stat", className = "" }: QuotableFactProps) => {
  const Icon = iconMap[type];

  return (
    <div className={`border-l-4 rounded-r-xl p-4 my-6 ${colorMap[type]} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColorMap[type]}`} />
        <div>
          <p className="font-medium text-foreground leading-relaxed">
            {fact}
          </p>
          {source && (
            <p className="text-sm text-muted-foreground mt-2">
              — {source}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotableFact;
