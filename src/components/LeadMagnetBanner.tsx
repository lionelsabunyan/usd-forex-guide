import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LeadMagnetBannerProps {
  variant?: "inline" | "card" | "compact";
  className?: string;
}

/**
 * Lead Magnet Banner Component
 * Promotes the free US Forex Trading Checklist across the site
 */
const LeadMagnetBanner = ({ variant = "card", className = "" }: LeadMagnetBannerProps) => {
  const trackClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_magnet_click", {
        variant,
        page_path: window.location.pathname,
      });
    }
  };

  if (variant === "compact") {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">📋</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">Free US Forex Checklist</p>
            <p className="text-xs text-muted-foreground">20+ items to verify before trading</p>
          </div>
          <Button size="sm" asChild onClick={trackClick}>
            <Link to="/resources/us-forex-checklist">
              Get Free
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/20 rounded-2xl p-6 my-8 ${className}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="text-4xl">📋</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-heading font-semibold text-foreground">
                Free: US Forex Trading Checklist
              </h4>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Don't start trading without this 20+ item checklist. Covers broker verification, account setup, and compliance essentials.
            </p>
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-success" />
                CFTC Compliance
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Risk Management
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Tax Preparation
              </span>
            </div>
            <Button size="sm" asChild onClick={trackClick}>
              <Link to="/resources/us-forex-checklist">
                Download Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default "card" variant - Premium modern design
  return (
    <div className={`relative overflow-hidden rounded-3xl my-12 ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

      <div className="relative p-8 md:p-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Icon/Illustration area */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <span className="text-6xl md:text-7xl">📋</span>
                </div>
                {/* Badge */}
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                Most Popular Resource
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                The Complete US Forex Trading Checklist
              </h3>

              <p className="text-white/80 mb-6 text-base md:text-lg">
                Everything you need to verify before depositing your first dollar. Covers broker selection, CFTC compliance, account setup, and risk management.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                <span className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  20+ Checkpoint Items
                </span>
                <span className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Printable PDF
                </span>
                <span className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  No Email Required
                </span>
              </div>

              <Link
                to="/resources/us-forex-checklist"
                onClick={trackClick}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 rounded-lg font-semibold text-lg shadow-lg transition-colors"
                style={{ color: '#1a365d' }}
              >
                Get Your Free Checklist
                <ArrowRight className="w-5 h-5" style={{ color: '#1a365d' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetBanner;
