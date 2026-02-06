import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Globe, ChevronDown, ArrowRight, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import BrokerLogo from "@/components/BrokerLogo";
import SEO from "@/components/SEO";
import ReviewForm from "@/components/ReviewForm";
import { Link } from "react-router-dom";
import { ThumbsUp, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const FXGloryReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 4.2;
  const trustScore = 80;
  const reviewCount = 2847;
  const lastUpdated = "February 4, 2026";

  const ratings = [
    { label: "Trading Conditions", score: 4.8, description: "1:3000 leverage, low spreads" },
    { label: "Platform & Tools", score: 4.5, description: "MT4, MT5 platforms" },
    { label: "Customer Support", score: 4.8, description: "24/7 multilingual support" },
    { label: "Deposit & Withdrawal", score: 4.8, description: "Multiple options, fast crypto" },
    { label: "Trust & Reputation", score: 4.5, description: "Since 2011, offshore" },
  ];

  const accountTypes = [
    {
      name: "Micro Account",
      minDeposit: "$1",
      leverage: "1:3000",
      spread: "From 2 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Hedging allowed", "Expert Advisors", "Beginners friendly"],
    },
    {
      name: "Standard Account",
      minDeposit: "$100",
      leverage: "1:3000",
      spread: "From 1.5 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Priority support", "Expert Advisors", "Hedging allowed"],
      popular: true,
    },
    {
      name: "VIP Account",
      minDeposit: "$5,000",
      leverage: "1:3000",
      spread: "From 0.5 pips",
      commission: "No",
      features: ["MT4/MT5 Platform", "All instruments", "Dedicated manager", "Lower spreads", "VIP support"],
    },
    {
      name: "ECN Account",
      minDeposit: "$500",
      leverage: "1:500",
      spread: "From 0.1 pips",
      commission: "$3 per lot",
      features: ["MT4/MT5 Platform", "Raw ECN spreads", "Institutional liquidity", "DMA access", "Best for scalpers"],
    },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit FXGlory Website",
      description: "Click our link to go to FXGlory's official registration page.",
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
      description: "Upload ID document and proof of address. Verification usually completed within 24 hours.",
      icon: UserPlus,
      time: "5 minutes"
    },
    {
      step: 4,
      title: "Fund Your Account",
      description: "Choose from multiple payment methods including crypto. Deposits are instant.",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: 5,
      title: "Start Trading",
      description: "Download MT4 or MT5 and access 50+ forex pairs with up to 1:3000 leverage.",
      icon: PlayCircle,
      time: "Ready!"
    }
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", fxglory: "Yes", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Minimum Deposit", fxglory: "$1", competitor1: "$50", competitor2: "$10", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Maximum Leverage", fxglory: "1:3000", competitor1: "1:500", competitor2: "1:500", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Spreads From", fxglory: "0.1 pips", competitor1: "0.0 pips", competitor2: "0.0 pips", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Trading Platforms", fxglory: "MT4, MT5", competitor1: "MT4, MT5", competitor2: "MT4, MT5", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "24/7 Support", fxglory: "Yes", competitor1: "No", competitor2: "No", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Crypto Deposits", fxglory: "Yes", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Established", fxglory: "2011", competitor1: "2019", competitor2: "2020", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
  ];

  const faqs = [
    {
      question: "Does FXGlory accept US clients?",
      answer: "Yes, FXGlory actively accepts clients from the United States. As an offshore broker registered in St. Vincent and the Grenadines, they are not subject to CFTC/NFA regulations, allowing them to serve US traders with high leverage options."
    },
    {
      question: "What is the minimum deposit at FXGlory?",
      answer: "FXGlory has an extremely low minimum deposit of just $1 for the Micro Account. This makes it one of the most accessible forex brokers for beginners. Standard accounts require $100, and VIP accounts require $5,000."
    },
    {
      question: "What leverage does FXGlory offer?",
      answer: "FXGlory offers leverage up to 1:3000, which is the highest in the industry. This is significantly higher than the 1:50 limit imposed by CFTC-regulated US brokers. However, high leverage increases both profit potential and risk."
    },
    {
      question: "Is FXGlory regulated and safe?",
      answer: "FXGlory is registered with the SVG FSA (St. Vincent and the Grenadines Financial Services Authority). While not regulated by major authorities like CFTC, FCA, or ASIC, they have been operating since 2011 with a generally positive track record."
    },
    {
      question: "How fast are FXGlory withdrawals?",
      answer: "FXGlory processes withdrawal requests within 24 hours. Crypto withdrawals (Bitcoin, Ethereum, USDT) are typically completed in 10-30 minutes. Bank wire and credit card withdrawals take 1-5 business days."
    },
    {
      question: "Can I use Expert Advisors (EAs) on FXGlory?",
      answer: "Yes, FXGlory fully supports Expert Advisors (automated trading robots) on both MT4 and MT5 platforms. Scalping and hedging strategies are also allowed without restrictions."
    }
  ];

  const paymentMethods = [
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-3 days", recommended: true },
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "Free", time: "1-5 business days" },
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes", recommended: true },
    { name: "Ethereum (ETH)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes" },
    { name: "USDT (Tether)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes", recommended: true },
    { name: "Skrill", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "1%", time: "Instant / 24 hours" },
    { name: "Perfect Money", deposit: "Free", withdrawal: "1%", time: "Instant" },
  ];

  const communityFeedback = {
    trustpilotRating: 4.0,
    trustpilotReviews: 500,
    positiveThemes: [
      "Highest leverage available (1:3000)",
      "Very low minimum deposit ($1)",
      "24/7 customer support",
      "Fast crypto withdrawals",
      "Both MT4 and MT5 supported",
    ],
    negativeThemes: [
      "Not regulated by major authorities",
      "Higher spreads than ECN brokers",
      "No negative balance protection guarantee",
    ],
    lastUpdated: "February 2026",
  };

  const pros = [
    "Accepts US clients without restrictions",
    "Extremely low minimum deposit ($1)",
    "Highest leverage in industry (1:3000)",
    "Multiple cryptocurrency payment options",
    "24/7 customer support availability",
    "Fast withdrawal processing (24-48 hours)",
    "Both MT4 and MT5 platforms available",
    "No deposit fees on most methods",
    "Scalping and hedging allowed",
    "Expert Advisors (EA) fully supported",
    "Operating since 2011",
  ];

  const cons = [
    "Not regulated by major financial authorities (SEC, FCA, ASIC)",
    "Limited educational resources and webinars",
    "No US-based phone support",
    "Spreads higher than some ECN brokers",
    "No guaranteed negative balance protection",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FXGlory Review 2026 - Highest Leverage Broker for US Traders"
        description="Complete FXGlory review for 2026. Offshore broker accepting US clients with 1:3000 leverage, $1 minimum deposit, crypto deposits, and 24/7 support. Operating since 2011."
        canonical="/review/fxglory"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "FXGlory",
            "url": brokers.fxglory.siteUrl,
            "description": "FXGlory is an offshore forex broker that accepts US clients, offering leverage up to 1:3000 and cryptocurrency deposits.",
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
                  <BrokerLogo broker={brokers.fxglory} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                        FXGlory Review
                      </h1>
                      <span className="px-2 py-1 text-xs font-bold bg-primary/10 text-primary rounded">SINCE 2011</span>
                    </div>
                    <p className="text-muted-foreground">Highest Leverage Broker for US Traders</p>
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
                  FXGlory is an offshore forex broker established in 2011 that actively accepts US clients. With the highest leverage in the industry at 1:3000, a $1 minimum deposit, and multiple crypto payment options, it's a popular choice for American traders seeking alternatives to CFTC-regulated brokers.
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$1</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">1:3000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">0.1</div>
                    <div className="text-xs text-muted-foreground">Spread From</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-success">YES</div>
                    <div className="text-xs text-muted-foreground">US Clients</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a
                      href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_HERO)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("fxglory", "review_hero", "visit_site")}
                    >
                      Visit FXGlory
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
                      <span className="font-semibold text-success">4.0/5 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2011</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">St. Vincent</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Regulation</span>
                      <span className="font-semibold text-foreground">SVG FSA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-success">$1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:3000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Instruments</span>
                      <span className="font-semibold text-foreground">50+</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">Accepted</span>
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
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">1:3000 Leverage</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">$1 Min Deposit</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">24/7 Support</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-success" />
                <span className="text-foreground font-medium">US Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning Banner */}
      <section className="py-6 bg-amber-500/5 border-b border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important: Offshore Broker Notice</h3>
                <p className="text-muted-foreground text-sm">
                  FXGlory is registered in St. Vincent and the Grenadines, not regulated by CFTC/NFA. While legal for US residents to use, you don't have access to US regulatory protections. The extremely high leverage (1:3000) significantly increases both profit potential and risk. Only trade with funds you can afford to lose.
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
                How to Open an FXGlory Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with FXGlory in minutes. Follow these simple steps to begin trading.
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
                  href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_HERO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("fxglory", "review_steps", "open_account")}
                >
                  Open FXGlory Account Now
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
                FXGlory vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how FXGlory compares to other US-accepting brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.fxglory} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-bold text-primary">FXGlory</span>
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
                        {row.fxglory === "Yes" ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.fxglory === "No" ? (
                          <span className="text-destructive">✕</span>
                        ) : (
                          <span className="font-medium text-primary">{row.fxglory}</span>
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
                FXGlory offers multiple account types to suit different trading styles and experience levels
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
                        href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_ACCOUNT_TYPE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("fxglory", "review_account_types", account.name)}
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
                FXGlory supports multiple payment methods including cryptocurrencies for fast funding
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
                      <td className="py-4 px-4 text-center text-muted-foreground">{method.withdrawal}</td>
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
                Common questions about FXGlory answered
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
                What traders are saying about FXGlory across review platforms
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
                        Based on {communityFeedback.trustpilotReviews}+ Trustpilot reviews
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
              This feedback is aggregated from Trustpilot and trading forums. Individual experiences may vary.{" "}
              <a
                href="https://www.trustpilot.com/review/fxglory.com"
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
            <ReviewForm brokerName="FXGlory" brokerId="fxglory" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with FXGlory?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open an account with just $1 and access the highest leverage in the industry at 1:3000. Fast crypto deposits and 24/7 support available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_BOTTOM)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("fxglory", "review_bottom", "visit_site")}
                >
                  Open Account Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link to="/compare">
                  Compare Other Brokers
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Risk Warning: Trading forex with high leverage carries extreme risk. FXGlory is an offshore broker not regulated by CFTC. Only trade with funds you can afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={getAffiliateUrl("fxglory", UTM_CONFIGS.REVIEW_HERO)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("fxglory", "review_sticky", "open_account")}
          >
            Visit FXGlory
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

export default FXGloryReview;
