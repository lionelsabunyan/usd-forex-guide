import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, Clock, CreditCard, Globe, Users, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const FXTMReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 3.1;
  const trustScore = 78;
  const ratingCount = 11500; // Total ratings (Google Search Console requirement)
  const reviewCount = 5600; // Total reviews (Google Search Console requirement)
  const trustpilotRating = 3.5;
  const trustpilotReviews = 800;

  const ratings = [
    { label: "Trading Conditions", score: 4.0, description: "High leverage (1:2000), multiple account types" },
    { label: "Platform & Tools", score: 4.0, description: "MT4/MT5 plus FXTM Invest copy trading" },
    { label: "Customer Support", score: 3.8, description: "Multilingual support available" },
    { label: "Deposit & Withdrawal", score: 3.8, description: "Multiple methods, some withdrawal fees" },
    { label: "Trust & Reputation", score: 4.0, description: "FCA & CySEC regulated since 2011" },
  ];

  const accountOpeningSteps = [
    { step: 1, title: "Visit FXTM Website", description: "Go to the official FXTM website", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your personal details and verify email", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Complete KYC Verification", description: "Upload ID and proof of address", icon: FileText, time: "5-10 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $10 via card, bank, or e-wallet", icon: Wallet, time: "Instant - 1 day" },
    { step: 5, title: "Start Trading or Copy Trading", description: "Trade manually or use FXTM Invest to copy traders", icon: PlayCircle, time: "5 minutes" },
  ];

  const keyHighlights = [
    { label: "Copy Trading", value: "FXTM Invest", icon: Users },
    { label: "Max Leverage", value: "1:2000", icon: Zap },
    { label: "Min Deposit", value: "$10", icon: Wallet },
    { label: "Regulation", value: "FCA, CySEC", icon: Shield },
  ];

  const accountTypes = [
    { name: "Micro", minDeposit: "$10", leverage: "1:2000", spread: "From 1.5 pips", commission: "No" },
    { name: "Advantage", minDeposit: "$500", leverage: "1:2000", spread: "From 0.0 pips", commission: "$0.4-2/lot", popular: true },
    { name: "Advantage Plus", minDeposit: "$500", leverage: "1:2000", spread: "From 1.0 pips", commission: "No" },
  ];

  const paymentMethods = [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "1-5 days", fee: "Free", recommended: true },
    { method: "Bank Wire", deposit: "3-5 days", withdrawal: "3-5 days", fee: "$30+" },
    { method: "Skrill", deposit: "Instant", withdrawal: "24 hours", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Instant", withdrawal: "24 hours", fee: "Free" },
    { method: "Local Bank Transfer", deposit: "1-3 days", withdrawal: "1-3 days", fee: "Varies" },
  ];

  const competitorComparison = [
    { broker: "FXTM", minDeposit: "$10", leverage: "1:2000", spread: "1.5 pips", feature: "FXTM Invest Copy Trading" },
    { broker: "Exness", minDeposit: "$10", leverage: "1:2000", spread: "0.3 pips", feature: "Instant Withdrawals" },
    { broker: "HFM", minDeposit: "$5", leverage: "1:2000", spread: "1.2 pips", feature: "HFcopy" },
  ];

  const faqs = [
    {
      question: "Is FXTM regulated and safe?",
      answer: "Yes, FXTM is regulated by the UK's Financial Conduct Authority (FCA), Cyprus Securities and Exchange Commission (CySEC), and Mauritius FSC. FCA and CySEC are top-tier regulators, providing strong investor protection including segregated client funds and negative balance protection."
    },
    {
      question: "Does FXTM accept US clients?",
      answer: "No, FXTM does not accept clients from the United States due to US regulatory requirements. US traders should look at brokers specifically licensed to serve US clients."
    },
    {
      question: "What is FXTM Invest and how does copy trading work?",
      answer: "FXTM Invest is FXTM's proprietary copy trading platform. You can browse successful traders (Strategy Managers), view their performance history, and automatically copy their trades. You keep control of your funds and can stop copying at any time. Profit sharing is typically 20-30% of profits to the Strategy Manager."
    },
    {
      question: "What is the minimum deposit at FXTM?",
      answer: "The minimum deposit for FXTM Micro account is just $10, making it very accessible for beginners. The Advantage and Advantage Plus accounts require $500 minimum deposit but offer better trading conditions with raw spreads."
    },
    {
      question: "How long do FXTM withdrawals take?",
      answer: "E-wallet withdrawals (Skrill, Neteller) are processed within 24 hours. Credit/debit card withdrawals take 1-5 business days. Bank wire transfers take 3-5 business days. FXTM charges fees on some withdrawal methods."
    },
    {
      question: "Does FXTM offer Turkish language support?",
      answer: "Yes, FXTM offers full Turkish language support including website, platform interface, and customer service. This makes it a popular choice among Turkish traders."
    },
  ];

  const pros = [
    "Multi-regulated (FCA, CySEC, FSC)",
    "FXTM Invest copy trading platform",
    "High leverage up to 1:2000",
    "Low minimum deposit ($10)",
    "Turkish language support",
    "Multiple account types",
    "Free educational resources",
    "Negative balance protection",
    "Local payment methods supported",
  ];

  const cons = [
    "US clients NOT accepted",
    "Lower Trustpilot rating (3.5/5)",
    "Withdrawal fees on some methods",
    "Spreads not the tightest",
    "Limited cryptocurrency options",
  ];

  const communityFeedback = {
    positiveThemes: [
      "Good copy trading feature",
      "Helpful Turkish support",
      "Educational content praised",
      "Multiple account options",
      "High leverage available",
    ],
    negativeThemes: [
      "Some withdrawal delays",
      "Spreads wider than competitors",
      "Platform stability issues reported",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FXTM Review 2026 - Copy Trading Broker with High Leverage"
        description="Complete FXTM (ForexTime) review. Multi-regulated broker with copy trading, 1:2000 leverage, $10 minimum deposit. Good for beginners and copy traders."
        canonical="/review/fxtm"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "FXTM",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": overallRating,
              "ratingCount": ratingCount,
              "reviewCount": reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": overallRating,
            "bestRating": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Copy Trading Available</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.fxtm} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">FXTM Review</h1>
                    <p className="text-muted-foreground mt-2">ForexTime - Multi-Regulated Since 2011</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 border border-success/30">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm font-semibold text-success">Trust Score: {trustScore}/100</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  FXTM (ForexTime) is a multi-regulated forex broker known for its copy trading platform "FXTM Invest" and high leverage options. With FCA and CySEC regulation, it offers Turkish traders a reliable option with local support and payment methods.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={brokers.fxtm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxtm", "review_hero", "visit_site")}>
                      Visit FXTM <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">Compare Brokers</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2"><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Trustpilot</span>
                      <span className="font-semibold text-foreground">{trustpilotRating}/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2011</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">FCA, CySEC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$10</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:2000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-destructive">Not Accepted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-success/5 border-y border-success/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">FCA & CySEC</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Users className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">FXTM Invest</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Turkish Support</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Zap className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">1:2000 Leverage</span></div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyHighlights.map((highlight, i) => (
                <Card key={i} className="bg-gradient-card border-border text-center p-4">
                  <highlight.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{highlight.label}</p>
                  <p className="text-lg font-bold text-foreground">{highlight.value}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Open Account */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">How to Open an FXTM Account</h2>
            <div className="space-y-4">
              {accountOpeningSteps.map((step) => (
                <Card key={step.step} className="bg-gradient-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-primary">Step {step.step}</span>
                          <span className="text-xs text-muted-foreground">• {step.time}</span>
                        </div>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.fxtm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxtm", "review_steps", "open_account")}>
                  Open FXTM Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-success/30">
                <CardHeader><CardTitle className="flex items-center gap-2 text-success"><Check className="w-6 h-6" />Advantages</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-success shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-destructive/30">
                <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" />Disadvantages</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="text-destructive shrink-0 mt-0.5">✕</span><span className="text-muted-foreground">{con}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Popular</div>}
                  <CardHeader className="text-center pb-2"><CardTitle className="text-lg">{account.name}</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Min Deposit</span><span className="font-medium">{account.minDeposit}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-medium">{account.leverage}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spread</span><span className="font-medium">{account.spread}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="font-medium">{account.commission}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Ratings */}
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

      {/* Payment Methods */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Deposit & Withdrawal Methods</h2>
            <Card className="bg-gradient-card border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Method</th>
                      <th className="text-left p-4 font-medium text-foreground">Deposit Time</th>
                      <th className="text-left p-4 font-medium text-foreground">Withdrawal Time</th>
                      <th className="text-left p-4 font-medium text-foreground">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentMethods.map((method, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground">{method.method}</span>
                            {method.recommended && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Recommended</span>}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{method.deposit}</td>
                        <td className="p-4 text-muted-foreground">{method.withdrawal}</td>
                        <td className="p-4 text-muted-foreground">{method.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">FXTM vs Competitors</h2>
            <Card className="bg-gradient-card border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Broker</th>
                      <th className="text-left p-4 font-medium text-foreground">Min Deposit</th>
                      <th className="text-left p-4 font-medium text-foreground">Leverage</th>
                      <th className="text-left p-4 font-medium text-foreground">Spread</th>
                      <th className="text-left p-4 font-medium text-foreground">Key Feature</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((comp, i) => (
                      <tr key={i} className={`border-t border-border ${comp.broker === "FXTM" ? "bg-primary/5" : ""}`}>
                        <td className="p-4 font-medium text-foreground">{comp.broker} {comp.broker === "FXTM" && "⭐"}</td>
                        <td className="p-4 text-muted-foreground">{comp.minDeposit}</td>
                        <td className="p-4 text-muted-foreground">{comp.leverage}</td>
                        <td className="p-4 text-muted-foreground">{comp.spread}</td>
                        <td className="p-4 text-muted-foreground">{comp.feature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Feedback */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Community Feedback</h2>
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-foreground">{trustpilotRating}</div>
                  <div>
                    <div className="flex mb-1">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(trustpilotRating) ? 'fill-primary text-primary' : 'text-muted'}`} />)}</div>
                    <p className="text-sm text-muted-foreground">Based on {trustpilotReviews.toLocaleString()}+ Trustpilot reviews</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-success" />Common Praise</h4>
                    <ul className="space-y-2">{communityFeedback.positiveThemes.map((theme, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-success">+</span>{theme}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><XCircle className="w-5 h-5 text-destructive" />Common Concerns</h4>
                    <ul className="space-y-2">{communityFeedback.negativeThemes.map((theme, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-destructive">-</span>{theme}</li>)}</ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Card key={i} className="bg-gradient-card border-border overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto"><ReviewForm brokerName="FXTM" brokerId="fxtm" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with FXTM?</h2>
            <p className="text-lg text-muted-foreground mb-8">Start trading or copy successful traders with FXTM Invest. $10 minimum deposit. Turkish support available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.fxtm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxtm", "review_bottom", "open_account")}>
                  Open FXTM Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Risk Warning: CFDs are complex instruments. High leverage can work against you.</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a href={brokers.fxtm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxtm", "review_sticky", "open_account")}>
            Open FXTM Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default FXTMReview;
