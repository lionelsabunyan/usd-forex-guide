import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Globe, Copy, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import LastUpdated from "@/components/LastUpdated";
import QuotableFact from "@/components/QuotableFact";
import { Link } from "react-router-dom";
import { ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const HFMReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 4.6;
  const trustScore = 90;
  const reviewCount = 8500;
  const lastUpdated = "February 4, 2026";

  const ratings = [
    { label: "Trading Conditions", score: 4.5, description: "Zero spreads, 1:2000 leverage" },
    { label: "Platform & Tools", score: 4.6, description: "MT4, MT5, HFM App" },
    { label: "Customer Support", score: 4.4, description: "24/5 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.5, description: "Multiple free options" },
    { label: "Trust & Reputation", score: 4.8, description: "Multi-regulated, 60+ awards" },
  ];

  const accountTypes = [
    {
      name: "Micro Account",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "No commission", "Cent accounts", "Beginners friendly", "Swap-free available"],
    },
    {
      name: "Premium Account",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "Standard lots", "All instruments", "Expert Advisors", "Hedging allowed"],
      popular: true,
    },
    {
      name: "Zero Spread",
      minDeposit: "$0",
      leverage: "1:2000",
      spread: "From 0.0 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw spreads", "Best for scalpers", "DMA execution", "VIP support"],
    },
    {
      name: "HFcopy Account",
      minDeposit: "$100",
      leverage: "1:400",
      spread: "From 1.0 pips",
      commission: "Performance fee",
      features: ["Copy trading", "Follow top traders", "Automated trading", "Risk management", "Strategy providers"],
    },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit HFM Website",
      description: "Click our link to go to HFM's official registration page with exclusive benefits.",
      icon: Globe,
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Fill Registration Form",
      description: "Enter your email, create a password, and provide basic personal information.",
      icon: FileText,
      time: "2 minutes"
    },
    {
      step: 3,
      title: "Verify Your Identity",
      description: "Upload ID document and proof of address. HFM's verification is usually completed within 24 hours.",
      icon: UserPlus,
      time: "5 minutes"
    },
    {
      step: 4,
      title: "Fund Your Account",
      description: "Choose from 20+ payment methods including crypto. Most deposits are instant.",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: 5,
      title: "Start Trading",
      description: "Download MT4, MT5, or use the HFM mobile app. Access 1200+ instruments instantly.",
      icon: PlayCircle,
      time: "Ready!"
    }
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", hfm: "No", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Minimum Deposit", hfm: "$0", competitor1: "$10", competitor2: "$10", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Maximum Leverage", hfm: "1:2000", competitor1: "1:1000", competitor2: "1:500", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Spreads From", hfm: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Trading Platforms", hfm: "MT4, MT5", competitor1: "MT5", competitor2: "MT4, MT5", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Copy Trading", hfm: "Yes (HFcopy)", competitor1: "No", competitor2: "No", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Crypto Deposits", hfm: "Yes", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Regulation", hfm: "CySEC, FCA", competitor1: "FSA (SVG)", competitor2: "FSA (SVG)", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
  ];

  const faqs = [
    {
      question: "Does HFM accept US clients?",
      answer: "No, HFM currently does not accept clients from the United States. US traders looking for offshore brokers should consider alternatives like MidasFX or Hankotrade which do accept US clients."
    },
    {
      question: "What is the minimum deposit at HFM?",
      answer: "HFM has no minimum deposit requirement for most account types. You can start trading with any amount. However, for practical trading with proper risk management, we recommend starting with at least $100-$200."
    },
    {
      question: "What leverage does HFM offer?",
      answer: "HFM offers leverage up to 1:2000 on its offshore entity. However, leverage varies by account type and instrument. For EU clients regulated by CySEC, maximum leverage is capped at 1:30 for retail traders."
    },
    {
      question: "Is HFM regulated and safe?",
      answer: "Yes, HFM is multi-regulated by CySEC (Cyprus), FCA (UK), DFSA (Dubai), FSCA (South Africa), and FSA (SVG). They've won 60+ industry awards and serve over 3.5 million clients worldwide since 2010."
    },
    {
      question: "How fast are HFM withdrawals?",
      answer: "HFM processes withdrawal requests within 24 hours. Actual receipt time depends on payment method: crypto (10-60 minutes), e-wallets (same day), credit cards (1-5 business days), bank wire (2-5 business days)."
    },
    {
      question: "What is HFcopy?",
      answer: "HFcopy is HFM's social/copy trading platform that allows you to automatically copy the trades of successful strategy providers. You can browse performance statistics and choose traders to follow based on their track record."
    }
  ];

  const paymentMethods = [
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days", recommended: true },
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", time: "2-5 business days" },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-60 minutes", recommended: true },
    { name: "USDT (Tether)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes", recommended: true },
    { name: "FasaPay", deposit: "Free", withdrawal: "Free", time: "Instant" },
    { name: "WebMoney", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
  ];

  const communityFeedback = {
    trustpilotRating: 4.2,
    trustpilotReviews: 8500,
    positiveThemes: [
      "Fast execution and competitive spreads",
      "Multiple regulation provides security",
      "Wide range of trading instruments",
      "Copy trading feature (HFcopy) praised",
      "Good educational resources",
    ],
    negativeThemes: [
      "US clients not accepted",
      "Some withdrawal delays reported",
      "Inactivity fees apply",
    ],
    lastUpdated: "February 2026",
  };

  const pros = [
    "Multi-regulated broker (CySEC, FCA, DFSA, FSCA, FSA)",
    "Award-winning broker since 2010 (60+ awards)",
    "Zero spread accounts available",
    "High leverage up to 1:2000",
    "No minimum deposit required",
    "Copy trading via HFcopy platform",
    "1200+ trading instruments",
    "Both MT4 and MT5 platforms",
    "Negative balance protection",
    "Free VPS for qualified traders",
    "Extensive educational resources",
    "24/5 multilingual support",
  ];

  const cons = [
    "US clients NOT currently accepted",
    "Offshore entity used for high leverage",
    "Inactivity fees ($5/month after 6 months)",
    "Limited crypto selection vs dedicated exchanges",
    "Withdrawal processing can take 2-5 days",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HFM Review 2026 - Award-Winning Multi-Regulated Broker"
        description="Complete HFM (formerly HotForex) review for 2026. Multi-regulated broker with 1200+ instruments, zero spread accounts, HFcopy trading, and 1:2000 leverage. Trusted since 2010."
        canonical="/review/hfm"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "HFM (HotForex)",
            "url": brokers.hfm.siteUrl,
            "description": "HFM is a multi-regulated forex and CFD broker offering trading on 1200+ instruments with leverage up to 1:2000.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": overallRating,
              "reviewCount": reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Beginner FX Guide",
            "url": "https://beginnerfxguide.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beginner FX Guide"
          },
          "datePublished": "2026-02-04",
          "dateModified": "2026-02-04",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": overallRating,
            "bestRating": "5",
            "worstRating": "1"
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
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-sm font-bold text-success">Trust Score: {trustScore}/100</span>
                  </div>
                  <div className="w-px h-4 bg-success/30" />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-muted-foreground">{communityFeedback.trustpilotRating}/5 Trustpilot</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.hfm} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                        HFM Review
                      </h1>
                      <span className="px-2 py-1 text-xs font-bold bg-primary/10 text-primary rounded">60+ AWARDS</span>
                    </div>
                    <p className="text-muted-foreground">Formerly HotForex - Multi-Regulated Since 2010</p>
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
                  HFM is a multi-regulated forex and CFD broker serving 3.5+ million clients since 2010. Regulated by CySEC, FCA, DFSA, and FSCA, it offers 1200+ instruments, zero spread accounts, and HFcopy social trading. <strong className="text-amber-500">Note: US clients not currently accepted.</strong>
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$0</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">1:2000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">0.0</div>
                    <div className="text-xs text-muted-foreground">Spread From</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-amber-500">NO</div>
                    <div className="text-xs text-muted-foreground">US Clients</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a
                      href={brokers.hfm.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("hfm", "review_hero", "visit_site")}
                    >
                      Visit HFM
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outlineGold" size="lg" asChild>
                    <Link to="/compare">
                      Compare Brokers
                    </Link>
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
                      <span className="font-semibold text-success">4.2/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2010</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">Cyprus</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">CySEC, FCA+</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-success">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:2000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Instruments</span>
                      <span className="font-semibold text-foreground">1200+</span>
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
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">CySEC & FCA Regulated</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">60+ Industry Awards</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">3.5M+ Clients</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Copy className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">HFcopy Trading</span>
              </div>
            </div>
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
                  HFM currently does not accept clients from the United States. This review is provided for informational purposes.
                  If you're a US trader looking for offshore brokers that accept US clients, please check our{" "}
                  <Link to="/compare" className="text-primary hover:underline">broker comparison</Link> page for alternatives like{" "}
                  <Link to="/review/midasfx" className="text-primary hover:underline">MidasFX</Link>,{" "}
                  <Link to="/review/hankotrade" className="text-primary hover:underline">Hankotrade</Link>, or{" "}
                  <Link to="/review/lmfx" className="text-primary hover:underline">LMFX</Link>.
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
                How to Open an HFM Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with HFM in minutes. Follow these simple steps to begin trading.
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
                  href={brokers.hfm.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hfm", "review_steps", "open_account")}
                >
                  Open HFM Account Now
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
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Pros & Cons
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-success/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <Check className="w-6 h-6" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-6 h-6" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-destructive shrink-0 mt-0.5">✕</span>
                        <span className="text-muted-foreground">{con}</span>
                      </li>
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
                HFM vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how HFM compares to other popular brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.hfm} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-bold text-primary">HFM</span>
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
                        {row.hfm === "Yes" ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.hfm === "No" ? (
                          <span className="text-amber-500 font-medium">{row.hfm}</span>
                        ) : (
                          <span className="font-medium text-primary">{row.hfm}</span>
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                HFM offers various account types to suit different trading styles and experience levels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountTypes.map((account, i) => (
                <Card key={i} className={`bg-gradient-card border-border relative ${account.popular ? 'ring-2 ring-primary' : ''}`}>
                  {account.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{account.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Min Deposit</p>
                      <p className="text-2xl font-bold text-primary">{account.minDeposit}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Leverage</span>
                        <span className="text-foreground font-medium">{account.leverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Spread</span>
                        <span className="text-foreground font-medium">{account.spread}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commission</span>
                        <span className="text-foreground font-medium">{account.commission}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 pt-4 border-t border-border">
                      {account.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={account.popular ? "hero" : "outlineGold"}
                      className="w-full mt-4"
                      asChild
                    >
                      <a
                        href={brokers.hfm.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("hfm", "review_account_types", account.name)}
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Deposit & Withdrawal Options
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                HFM offers 20+ payment methods for convenient funding and withdrawals
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Common questions about HFM answered
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

      {/* Community Feedback Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Community Feedback
              </h2>
              <p className="text-muted-foreground">
                What traders are saying about HFM across review platforms
              </p>
            </div>

            <Card className="bg-gradient-card border-border mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">{communityFeedback.trustpilotRating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(communityFeedback.trustpilotRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {communityFeedback.trustpilotReviews.toLocaleString()}+ Trustpilot reviews
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {communityFeedback.lastUpdated}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      Common Praise
                    </h4>
                    <ul className="space-y-2">
                      {communityFeedback.positiveThemes.map((theme, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-success">+</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-destructive" />
                      Common Concerns
                    </h4>
                    <ul className="space-y-2">
                      {communityFeedback.negativeThemes.map((theme, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive">-</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground text-center">
              This feedback is aggregated from Trustpilot and other review platforms. Individual experiences may vary.{" "}
              <a
                href="https://www.trustpilot.com/review/hfm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on Trustpilot →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="HFM" brokerId="hfm" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interested in HFM?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              While HFM doesn't currently accept US clients, it remains a solid choice for international traders seeking a multi-regulated broker with competitive trading conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href={brokers.hfm.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hfm", "review_bottom", "visit_site")}
                >
                  Visit HFM Website
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link to="/compare">
                  Compare US-Friendly Brokers
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Risk Warning: Trading forex and CFDs carries a high level of risk. You may lose more than your initial investment.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={brokers.hfm.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("hfm", "review_sticky", "open_account")}
          >
            Visit HFM Website
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

export default HFMReview;
