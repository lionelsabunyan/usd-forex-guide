import { Shield, FileText, RefreshCw, Award, TrendingUp, CheckCircle, Scale, Eye } from "lucide-react";

/**
 * Trust Signals Component
 * Displays honest, verifiable trust indicators
 * Hybrid approach: Numbers (verifiable) + Checkmarks (methodology promises)
 */

interface TrustSignalsProps {
  variant?: "horizontal" | "vertical" | "compact";
  showStats?: boolean;
}

// Only verifiable, honest statistics
const stats = [
  {
    icon: Award,
    value: "25+",
    label: "Brokers Reviewed",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: FileText,
    value: "50+",
    label: "Trading Guides",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: RefreshCw,
    value: "Monthly",
    label: "Updates",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: TrendingUp,
    value: "$0",
    label: "Min. Deposit Options",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

// Methodology promises with checkmarks
const trustBadges = [
  { icon: CheckCircle, label: "Transparent Methodology" },
  { icon: Scale, label: "Unbiased Comparisons" },
  { icon: Eye, label: "No Paid Placements" },
  { icon: Shield, label: "SSL Secured" },
];

const TrustSignals = ({ variant = "horizontal", showStats = true }: TrustSignalsProps) => {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <badge.icon className="w-4 h-4 text-primary" />
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Why Trust Us
        </h4>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <section className="py-8 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="font-bold text-2xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-border">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
