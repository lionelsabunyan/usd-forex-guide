import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NewsletterCTAProps {
  variant?: "inline" | "card";
  className?: string;
}

const NewsletterCTA = ({ variant = "card", className = "" }: NewsletterCTAProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service
    if (email) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (variant === "inline") {
    return (
      <div className={`bg-gradient-card border border-border rounded-xl p-6 my-8 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 rounded-full p-3">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-semibold text-foreground mb-1">
              Get Weekly Forex Insights
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Join 5,000+ US traders receiving our weekly market analysis and trading tips.
            </p>
            {status === "success" ? (
              <p className="text-green-500 text-sm font-medium">
                Thanks! Check your inbox for confirmation.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-hero border border-border rounded-2xl p-8 my-12 text-center ${className}`}>
      <div className="max-w-xl mx-auto">
        <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Stay Ahead of the Market
        </h3>
        <p className="text-muted-foreground mb-6">
          Get exclusive forex trading insights, broker updates, and educational content delivered to your inbox weekly.
        </p>
        {status === "success" ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-500 font-medium">
              You're subscribed! Check your inbox for confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              Subscribe Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default NewsletterCTA;
