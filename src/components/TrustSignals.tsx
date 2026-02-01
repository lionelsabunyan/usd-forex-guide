import { Shield, Users, Star, Clock, Award, TrendingUp } from "lucide-react";

/**
 * Trust Signals Component
 * Displays social proof and trust indicators to increase conversions
 * Expected conversion increase: 10-20%
 */

interface TrustSignalsProps {
  variant?: "horizontal" | "vertical" | "compact";
  showStats?: boolean;
}

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Traders",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "User Rating",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Clock,
    value: "5+ Years",
    label: "Industry Experience",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    value: "100+",
    label: "Broker Reviews",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const trustBadges = [
  { icon: Shield, label: "SSL Secured" },
  { icon: TrendingUp, label: "Expert Analysis" },
  { icon: Award, label: "Unbiased Reviews" },
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
