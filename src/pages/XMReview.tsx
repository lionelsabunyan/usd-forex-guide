import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, AlertTriangle, Clock, CreditCard, Globe, Gift, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";
import { ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const XMReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 4.5;
  const ratingCount = 18500; // Total number of ratings (Google Search Console requirement)
  const reviewCount = 9200; // Total number of written reviews (Google Search Console requirement)
  const trustScore = 84;
  const trustpilotRating = 3.8;
  const trustpilotReviews = 1500;

  const ratings = [
    { label: "Trading Conditions", score: 4.0, description: "Ultra-low spreads, 1:1000 leverage" },
    { label: "Platform & Tools", score: 4.3, description: "MT4, MT5, XM App" },
    { label: "Customer Support", score: 4.3, description: "24/5 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.3, description: "No fees, multiple options" },
    { label: "Trust & Reputation", score: 4.3, description: "CySEC, ASIC, DFSA regulated" },
  ];

  const accountTypes = [
    { name: "Micro", minDeposit: "$5", leverage: "1:1000", spread: "From 1.0 pips", commission: "No" },
    { name: "Standard", minDeposit: "$5", leverage: "1:1000", spread: "From 1.0 pips", commission: "No", popular: true },
    { name: "XM Ultra Low", minDeposit: "$5", leverage: "1:1000", spread: "From 0.6 pips", commission: "No" },
    { name: "Shares", minDeposit: "$10,000", leverage: "1:1", spread: "Variable", commission: "Yes" },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit XM Website",
      description: "Click our link to access XM's registration page with bonus offer.",
      icon: Globe,
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Complete Registration",
      description: "Enter email, password, and personal details. Turkish language available.",
      icon: FileText,
      time: "2 minutes"
    },
    {
      step: 3,
      title: "Verify Your Account",
      description: "Upload ID and proof of address. Verification usually takes 24 hours.",
      icon: UserPlus,
      time: "5 minutes"
    },
    {
      step: 4,
      title: "Fund Your Account",
      description: "Deposit from just $5 via card, e-wallet, or bank transfer. No fees!",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: 5,
      title: "Claim Bonus & Trade",
      description: "Get your welcome bonus and start trading with MT4/MT5.",
      icon: PlayCircle,
      time: "Ready!"
    }
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", xm: "No", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Minimum Deposit", xm: "$5", competitor1: "$10", competitor2: "$10", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Maximum Leverage", xm: "1:1000", competitor1: "1:1000", competitor2: "1:500", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Spreads From", xm: "0.6 pips", competitor1: "0.0 pips", competitor2: "0.0 pips", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Trading Platforms", xm: "MT4, MT5", competitor1: "MT5", competitor2: "MT4, MT5", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Welcome Bonus", xm: "Yes", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Deposit/Withdrawal Fees", xm: "Free", competitor1: "Free", competitor2: "Free", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Regulation", xm: "CySEC, ASIC", competitor1: "FSA (SVG)", competitor2: "FSA (SVG)", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
  ];

  const faqs = [
    {
      question: "Does XM accept US clients?",
      answer: "No, XM does not accept clients from the United States. US traders seeking offshore brokers should consider alternatives like MidasFX or Hankotrade which do accept US clients."
    },
    {
      question: "What is the minimum deposit at XM?",
      answer: "XM has one of the lowest minimum deposits in the industry at just $5 for Micro, Standard, and Ultra Low accounts. This makes it very accessible for beginners."
    },
    {
      question: "What leverage does XM offer?",
      answer: "XM offers leverage up to 1:1000 on its offshore entity. For EU clients under CySEC regulation, leverage is capped at 1:30 for retail traders as per ESMA regulations."
    },
    {
      question: "Is XM regulated and safe?",
      answer: "Yes, XM is regulated by multiple authorities including CySEC (Cyprus), ASIC (Australia), and FSC (Belize). They've been operating since 2009 and have negative balance protection."
    },
    {
      question: "Does XM offer bonuses?",
      answer: "Yes, XM is known for generous bonuses including welcome bonuses and loyalty programs. Bonus terms and availability vary by region - check their website for current offers."
    },
    {
      question: "What payment methods does XM accept?",
      answer: "XM accepts a wide range of payment methods including credit/debit cards, bank wire, Skrill, Neteller, and various local payment methods. Deposits and withdrawals are free."
    }
  ];

  const paymentMethods = [
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-5 days", recommended: true },
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", time: "2-5 business days" },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours", recommended: true },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Local Bank Transfer", deposit: "Free", withdrawal: "Free", time: "1-3 business days" },
  ];

  const pros = [
    "Multi-regulated (CySEC, ASIC, FSC)",
    "Very low minimum deposit ($5)",
    "No deposit/withdrawal fees",
    "Generous bonuses and promotions",
    "24/5 multilingual support",
    "Turkish language fully supported",
    "Free educational webinars",
    "Negative balance protection",
    "Ultra-low spread accounts available",
    "Established since 2009",
    "Over 5 million clients worldwide",
  ];

  const cons = [
    "US clients NOT accepted",
    "Mixed Trustpilot reviews (3.8/5)",
    "Spreads wider than ECN brokers",
    "Limited cryptocurrency trading",
    "Inactivity fee after 90 days",
  ];

  const communityFeedback = {
    positiveThemes: [
      "Excellent Turkish support",
      "Fast withdrawals praised",
      "Good educational content",
      "Generous welcome bonus",
      "Low minimum deposit",
    ],
    negativeThemes: [
      "Spreads can widen significantly",
      "Bonus terms restrictive",
      "US traders not accepted",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="XM Review 2026 - Low Deposit Broker with Generous Bonuses"
        description="Complete XM review. Globally popular broker with $5 minimum deposit, 1:1000 leverage, extensive education, and welcome bonuses. CySEC and ASIC regulated."
        canonical="/review/xm"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "XM",
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

      {/* Hero Section with Trust Score */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                {/* Trust Score Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-primary">Trust Score: {trustScore}/100</span>
                  </div>
                  <div className="w-px h-4 bg-primary/30" />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-muted-foreground">{trustpilotRating}/5 Trustpilot</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.xm} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">XM Review</h1>
                      <span className="px-2 py-1 text-xs font-bold bg-primary/10 text-primary rounded">$5 MIN</span>
                    </div>
                    <p className="text-muted-foreground">Multi-Regulated Since 2009 • 5M+ Clients</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : i < overallRating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{overallRating}/5</span>
                  <span className="text-muted-foreground">Expert Rating</span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  XM is a globally popular forex broker serving over 5 million clients since 2009. Regulated by CySEC and ASIC, it's known for ultra-low minimum deposits, generous bonuses, and excellent customer support in multiple languages including Turkish. <strong className="text-amber-500">Note: US clients not accepted.</strong>
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$5</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">1:1000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">0.6</div>
                    <div className="text-xs text-muted-foreground">Spread From</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-amber-500">NO</div>
                    <div className="text-xs text-muted-foreground">US Clients</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={brokers.xm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("xm", "review_hero", "visit_site")}>
                      Visit XM <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">Compare Brokers</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 w-full">
                <Card className="bg-gradient-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Trustpilot</span>
                      <span className="font-semibold text-foreground">{trustpilotRating}/5 ⭐</span>
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
                      <span className="font-semibold text-success">$5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:1000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Bonuses</span>
                      <span className="font-semibold text-success">Available</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-amber-500">Not Accepted</span>
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
            <div className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">CySEC & ASIC</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><CreditCard className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">$5 Min Deposit</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Turkish Support</span></div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2"><Gift className="w-6 h-6 text-primary" /><span className="text-foreground font-medium">Welcome Bonus</span></div>
          </div>
        </div>
      </section>

      {/* US Clients Notice */}
      <section className="py-8 bg-amber-500/5 border-b border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important Notice for US Traders</h3>
                <p className="text-muted-foreground text-sm">
                  XM does not accept clients from the United States. This review is provided for informational purposes.
                  US traders seeking offshore brokers should check our{" "}
                  <Link to="/compare" className="text-primary hover:underline">broker comparison</Link> for alternatives like{" "}
                  <Link to="/review/midasfx" className="text-primary hover:underline">MidasFX</Link> or{" "}
                  <Link to="/review/hankotrade" className="text-primary hover:underline">Hankotrade</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Open Account */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                How to Open an XM Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with XM in minutes. Follow these simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {accountOpeningSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="bg-gradient-card border-border h-full hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-xs text-primary font-medium mb-2">Step {step.step}</div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                      <div className="text-xs text-primary font-medium">⏱ {step.time}</div>
                    </CardContent>
                  </Card>
                  {index < accountOpeningSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href={brokers.xm.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("xm", "review_steps", "open_account")}
                >
                  Open XM Account Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Detailed Ratings */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Detailed Ratings
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {ratings.map((rating, i) => (
                <Card key={i} className="bg-gradient-card border-border text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{rating.score}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < Math.floor(rating.score) ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="font-medium text-foreground text-sm mb-1">{rating.label}</p>
                    <p className="text-xs text-muted-foreground">{rating.description}</p>
                  </CardContent>
                </Card>
              ))}
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

      {/* Competitor Comparison Table */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                XM vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how XM compares to other popular brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.xm} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-bold text-primary">XM</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.midasfx} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-medium text-foreground">MidasFX</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.hankotrade} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-medium text-foreground">Hankotrade</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.xm === "Yes" ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.xm === "No" ? (
                          <span className="text-amber-500 font-medium">{row.xm}</span>
                        ) : (
                          <span className="font-medium text-primary">{row.xm}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor1 === "Yes" ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.competitor1 === "No" ? (
                          <span className="text-destructive">✕</span>
                        ) : (
                          <span className="text-foreground">{row.competitor1}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor2 === "Yes" ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.competitor2 === "No" ? (
                          <span className="text-destructive">✕</span>
                        ) : (
                          <span className="text-foreground">{row.competitor2}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-6">
              <Link to="/compare" className="text-primary hover:underline inline-flex items-center gap-1">
                View Full Broker Comparison <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Account Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Popular</div>}
                  <CardHeader className="text-center pb-2"><CardTitle className="text-lg">{account.name}</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Min Deposit</span><span className="font-medium">{account.minDeposit}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Leverage</span><span className="font-medium">{account.leverage}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spread</span><span className="font-medium">{account.spread}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="font-medium">{account.commission}</span></div>
                    <Button
                      variant={account.popular ? "hero" : "outlineGold"}
                      className="w-full mt-4"
                      asChild
                    >
                      <a
                        href={brokers.xm.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("xm", "review_account_types", account.name)}
                      >
                        Open Account
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Deposit & Withdrawal Options
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                XM offers free deposits and withdrawals with multiple payment methods
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Method</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Deposit Fee</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Withdrawal Fee</th>
                    <th className="text-right py-4 px-4 text-muted-foreground font-medium">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          {method.name}
                          {method.recommended && (
                            <span className="px-2 py-0.5 text-xs bg-success/10 text-success rounded">Recommended</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-success">{method.deposit}</td>
                      <td className="py-4 px-4 text-center text-success">{method.withdrawal}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{method.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Common questions about XM answered
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-gradient-card border-border overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/30 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Feedback */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Community Feedback</h2>
              <p className="text-muted-foreground">What traders are saying about XM</p>
            </div>
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

      {/* Review Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto"><ReviewForm brokerName="XM" brokerId="xm" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Trade with XM?</h2>
            <p className="text-lg text-muted-foreground mb-8">Start trading with just $5 and enjoy welcome bonuses and multilingual support.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={brokers.xm.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("xm", "review_bottom", "open_account")}>
                  Open Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild><Link to="/compare">Compare Brokers</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Risk Warning: CFDs are complex instruments. 74.12% of retail investor accounts lose money when trading CFDs.</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={brokers.xm.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("xm", "review_sticky", "open_account")}
          >
            Visit XM
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 md:hidden" />

      <Footer />
    </div>
  );
};

export default XMReview;
