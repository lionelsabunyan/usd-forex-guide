import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, Clock, CreditCard, Globe, Smartphone, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const FBSReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 3.0;
  const trustScore = 80;
  const trustpilotRating = 4.0;
  const trustpilotReviews = 5000;

  const ratings = [
    { label: "Trading Conditions", score: 4.3, description: "Extremely high leverage (1:3000), low entry barrier" },
    { label: "Platform & Tools", score: 4.0, description: "MT4/MT5 plus FBS Trader mobile app" },
    { label: "Customer Support", score: 4.0, description: "24/7 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "$5 minimum, multiple options" },
    { label: "Trust & Reputation", score: 4.0, description: "CySEC & ASIC regulated since 2009" },
  ];

  const accountOpeningSteps = [
    { step: 1, title: "Visit FBS Website", description: "Go to the official FBS website", icon: Globe, time: "30 seconds" },
    { step: 2, title: "Register Account", description: "Fill in your details and choose account type", icon: UserPlus, time: "2 minutes" },
    { step: 3, title: "Complete KYC Verification", description: "Upload ID and proof of address", icon: FileText, time: "5-10 minutes" },
    { step: 4, title: "Fund Your Account", description: "Deposit minimum $1 via card, e-wallet, or crypto", icon: Wallet, time: "Instant - 1 day" },
    { step: 5, title: "Claim Bonus & Trade", description: "Activate your welcome bonus and start trading", icon: PlayCircle, time: "5 minutes" },
  ];

  const keyHighlights = [
    { label: "Min Deposit", value: "$1", icon: Wallet },
    { label: "Max Leverage", value: "1:3000", icon: Zap },
    { label: "Bonus", value: "Up to $140", icon: Gift },
    { label: "Regulation", value: "CySEC, ASIC", icon: Shield },
  ];

  const accountTypes = [
    { name: "Cent", minDeposit: "$1", leverage: "1:1000", spread: "From 1.0 pips", commission: "No" },
    { name: "Standard", minDeposit: "$100", leverage: "1:3000", spread: "From 0.5 pips", commission: "No", popular: true },
    { name: "Zero Spread", minDeposit: "$500", leverage: "1:3000", spread: "0.0 pips", commission: "$20/lot" },
    { name: "ECN", minDeposit: "$1000", leverage: "1:500", spread: "From -1 pip", commission: "$6/lot" },
  ];

  const paymentMethods = [
    { method: "Credit/Debit Card", deposit: "Instant", withdrawal: "15-20 min", fee: "Free", recommended: true },
    { method: "Bank Wire", deposit: "3-5 days", withdrawal: "3-5 days", fee: "Varies" },
    { method: "Skrill", deposit: "Instant", withdrawal: "15-20 min", fee: "Free", recommended: true },
    { method: "Neteller", deposit: "Instant", withdrawal: "15-20 min", fee: "Free" },
    { method: "Crypto", deposit: "1 hour", withdrawal: "1-3 hours", fee: "Network fee" },
    { method: "Perfect Money", deposit: "Instant", withdrawal: "15-20 min", fee: "Free" },
  ];

  const competitorComparison = [
    { broker: "FBS", minDeposit: "$1", leverage: "1:3000", spread: "0.5 pips", feature: "Highest Leverage + Bonuses" },
    { broker: "FXTM", minDeposit: "$10", leverage: "1:2000", spread: "1.5 pips", feature: "FXTM Invest Copy Trading" },
    { broker: "HFM", minDeposit: "$5", leverage: "1:2000", spread: "1.2 pips", feature: "HFcopy" },
  ];

  const faqs = [
    {
      question: "Is FBS regulated and safe?",
      answer: "Yes, FBS is regulated by CySEC (Cyprus), ASIC (Australia), FSCA (South Africa), and FSC (Belize). CySEC and ASIC are top-tier regulators. FBS has been operating since 2009 and offers segregated client funds and negative balance protection."
    },
    {
      question: "Does FBS accept US clients?",
      answer: "No, FBS does not accept clients from the United States due to US regulatory requirements. US traders should look at brokers specifically licensed to serve US clients."
    },
    {
      question: "Is 1:3000 leverage safe to use?",
      answer: "1:3000 leverage is extremely high and carries significant risk. While it allows you to open large positions with small capital, losses are also magnified. Most retail traders (80%+) lose money with high leverage. Beginners should use much lower leverage (1:10 to 1:50) until they have experience."
    },
    {
      question: "What is the minimum deposit at FBS?",
      answer: "FBS offers one of the lowest minimum deposits in the industry. The Cent account requires just $1, while the Standard account needs $100. This makes FBS very accessible for beginners who want to start with small amounts."
    },
    {
      question: "How do FBS bonuses work?",
      answer: "FBS offers various bonuses including welcome bonuses up to $140. However, bonuses have trading volume requirements before withdrawal. Read the terms carefully - you typically need to trade a certain number of lots before bonus funds can be withdrawn."
    },
    {
      question: "How long do FBS withdrawals take?",
      answer: "FBS processes most withdrawals within 15-20 minutes for e-wallets (Skrill, Neteller) and cards. This is faster than many competitors. Bank wire transfers take 3-5 business days. Crypto withdrawals typically complete within 1-3 hours."
    },
  ];

  const pros = [
    "Multi-regulated (CySEC, ASIC, FSC, FSCA)",
    "Extremely high leverage up to 1:3000",
    "Very low minimum deposit ($1)",
    "Generous bonuses and promotions",
    "Turkish language support",
    "Good mobile trading app",
    "Copy trading available",
    "Negative balance protection",
    "Free VPS for active traders",
    "Fast withdrawal processing",
  ];

  const cons = [
    "US clients NOT accepted",
    "Very high leverage = extreme risk",
    "Withdrawal fees may apply",
    "Spreads not the tightest",
    "Bonus terms can be restrictive",
  ];

  const communityFeedback = {
    positiveThemes: [
      "Low minimum deposit praised",
      "Good Turkish support",
      "Easy account opening",
      "Attractive bonuses",
      "Decent mobile app",
    ],
    negativeThemes: [
      "Extremely high leverage risky",
      "Some withdrawal issues reported",
      "Spreads widen during volatility",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FBS Review 2026 - High Leverage Broker with $1 Minimum Deposit"
        description="Complete FBS review. Multi-regulated broker with 1:3000 leverage, $1 minimum deposit, and generous bonuses. Good for beginners."
        canonical="/review/fbs"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "FBS",
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 4.1,
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
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">1:3000 Leverage Available</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.fbs} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">FBS Review</h1>
                    <p className="text-muted-foreground mt-2">Multi-Regulated Since 2009</p>
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
                  FBS is a global forex broker known for extremely high leverage (up to 1:3000), very low minimum deposits, and generous bonus programs. With multiple regulations including CySEC and ASIC, it serves Turkish traders with local language support.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={brokers.fbs.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fbs", "review_hero", "visit_site")}>
                      Visit FBS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                      <span className="font-semibold text-success">{trustpilotRating}/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2009</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">CySEC, ASIC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-success">$1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:3000</span>
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

      {/* Warning Banner */}
      <section className="py-4 bg-warning/10 border-y border-warning/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <p className="text-sm text-warning font-medium">
              Warning: 1:3000 leverage is extremely high risk. 80%+ of retail traders lose money with high leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-success/5 border-y border-success/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">CySEC & ASIC</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><CreditCard className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">$1 Min Deposit</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Turkish Support</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Gift className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Welcome Bonus</span></div>
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
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">How to Open an FBS Account</h2>
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
                <a href={brokers.fbs.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fbs", "review_steps", "open_account")}>
                  Open FBS Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">FBS vs Competitors</h2>
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
                      <tr key={i} className={`border-t border-border ${comp.broker === "FBS" ? "bg-primary/5" : ""}`}>
                        <td className="p-4 font-medium text-foreground">{comp.broker} {comp.broker === "FBS" && "⭐"}</td>
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
                  <div className="text-4xl font-bold text-success">{trustpilotRating}</div>
                  <div>
                    <div className="flex mb-1">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(trustpilotRating) ? 'fill-success text-success' : 'text-muted'}`} />)}</div>
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
          <div className="max-w-3xl mx-auto"><ReviewForm brokerName="FBS" brokerId="fbs" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with FBS?</h2>
            <p className="text-lg text-muted-foreground mb-8">Start trading with just $1 and access generous bonuses with Turkish support.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.fbs.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fbs", "review_bottom", "open_account")}>
                  Open FBS Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Risk Warning: CFDs are complex instruments. Very high leverage significantly increases the risk of losing all your capital.</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a href={brokers.fbs.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fbs", "review_sticky", "open_account")}>
            Open FBS Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default FBSReview;
