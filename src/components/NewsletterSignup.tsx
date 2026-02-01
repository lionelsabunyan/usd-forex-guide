import { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { subscriberStore } from "@/lib/adminStore";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
  className?: string;
}

const NewsletterSignup = ({ variant = "card", className = "" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      return;
    }

    setStatus("loading");

    try {
      // Save to local store
      const result = subscriberStore.add(email, variant === "card" ? "footer" : "inline");

      // Track signup event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "newsletter_signup", {
          email_domain: email.split("@")[1],
          source: variant,
          is_new: result !== null,
        });
      }

      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  if (variant === "inline") {
    return (
      <div className={`${className}`}>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span>Thanks! Check your inbox for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Subscribe"}
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-gradient-card border border-border rounded-2xl p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            Stay Updated
          </h3>
          <p className="text-sm text-muted-foreground">
            Weekly forex tips & broker updates
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl">
          <CheckCircle className="w-6 h-6 text-success" />
          <div>
            <p className="font-medium text-foreground">You're subscribed!</p>
            <p className="text-sm text-muted-foreground">
              Check your inbox for confirmation.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground mb-4">
            Get exclusive trading insights, broker comparisons, and market analysis
            delivered to your inbox every week. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe for Free
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            By subscribing, you agree to our{" "}
            <a href="/legal/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default NewsletterSignup;
