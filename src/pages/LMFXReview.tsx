import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Check, ExternalLink, Shield, Zap, DollarSign, Award, Clock, CreditCard, Users, TrendingUp, AlertTriangle, MessageCircle, Bitcoin, ChevronDown, ArrowRight, Globe, FileText, UserPlus, Wallet, PlayCircle } from "lucide-react";
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

const LMFXReview = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const overallRating = 4.5;
  const trustScore = 72;
  const ratingCount = 9800; // Total ratings (Google Search Console requirement)
  const reviewCount = 4800; // Total reviews (Google Search Console requirement)
  const lastUpdated = "February 4, 2026";

  const ratings = [
    { label: "Trading Conditions", score: 3.8, description: "Zero spreads, 1:1000 leverage" },
    { label: "Platform & Tools", score: 3.5, description: "MT4 only, full EA support" },
    { label: "Customer Support", score: 3.8, description: "24/5 responsive support" },
    { label: "Deposit & Withdrawal", score: 3.8, description: "Crypto + multiple options" },
    { label: "Trust & Reputation", score: 3.3, description: "Unregulated offshore broker" },
  ];

  const accountTypes = [
    {
      name: "Premium Account",
      minDeposit: "$50",
      leverage: "1:1000",
      spread: "From 1.0 pips",
      commission: "No",
      features: ["MT4 Platform", "No commission", "All instruments", "Hedging allowed", "EA supported"],
    },
    {
      name: "Fixed Account",
      minDeposit: "$250",
      leverage: "1:400",
      spread: "Fixed 2.0 pips",
      commission: "No",
      features: ["MT4 Platform", "Fixed spreads", "No slippage", "News trading", "Scalping allowed"],
      popular: true,
    },
    {
      name: "Zero Account",
      minDeposit: "$100",
      leverage: "1:1000",
      spread: "From 0.0 pips",
      commission: "$4 per lot",
      features: ["MT4 Platform", "Raw spreads", "Best for scalpers", "ECN execution", "VIP support"],
    },
  ];

  const accountOpeningSteps = [
    {
      step: 1,
      title: "Visit LMFX Website",
      description: "Click our link to access LMFX's secure registration page.",
      icon: Globe,
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Complete Registration",
      description: "Fill in your details - name, email, phone, and country (US accepted).",
      icon: FileText,
      time: "2 minutes"
    },
    {
      step: 3,
      title: "Verify Your Identity",
      description: "Upload ID and proof of address. Verification typically takes 24 hours.",
      icon: UserPlus,
      time: "5 minutes"
    },
    {
      step: 4,
      title: "Fund Your Account",
      description: "Deposit via crypto (BTC, ETH, USDT), card, or e-wallet. Minimum $50.",
      icon: Wallet,
      time: "Instant"
    },
    {
      step: 5,
      title: "Start Trading",
      description: "Download MT4, choose your leverage (up to 1:1000), and begin trading.",
      icon: PlayCircle,
      time: "Ready!"
    }
  ];

  const competitorComparison = [
    { feature: "US Clients Accepted", lmfx: true, competitor1: true, competitor2: true, competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Minimum Deposit", lmfx: "$50", competitor1: "$10", competitor2: "$10", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Maximum Leverage", lmfx: "1:1000", competitor1: "1:1000", competitor2: "1:500", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Spreads From", lmfx: "0.0 pips", competitor1: "0.0 pips", competitor2: "0.0 pips", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Trading Platform", lmfx: "MT4 only", competitor1: "MT5", competitor2: "MT4, MT5", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Trading Contests", lmfx: "Yes ($25K)", competitor1: "Yes", competitor2: "Yes", competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Crypto Deposits", lmfx: true, competitor1: true, competitor2: true, competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
    { feature: "Fixed Spread Option", lmfx: true, competitor1: false, competitor2: false, competitor1Name: "MidasFX", competitor2Name: "Hankotrade" },
  ];

  const faqs = [
    {
      question: "Does LMFX accept US clients?",
      answer: "Yes, LMFX fully accepts US clients without restrictions. As an offshore broker registered in St. Vincent and the Grenadines, they're able to serve American traders who want access to higher leverage and more trading flexibility."
    },
    {
      question: "What is the minimum deposit at LMFX?",
      answer: "The minimum deposit is $50 for the Premium Account, $100 for the Zero Account, and $250 for the Fixed Account. We recommend starting with at least $100-200 for proper risk management."
    },
    {
      question: "Is LMFX regulated?",
      answer: "LMFX is registered in St. Vincent and the Grenadines. While not regulated by major authorities like FCA or CySEC, they've been operating since 2015 with a solid track record. Trade only with funds you can afford to lose."
    },
    {
      question: "How can I deposit and withdraw at LMFX?",
      answer: "LMFX offers multiple options: credit/debit cards, bank wire, and cryptocurrencies (Bitcoin, Ethereum, USDT). Crypto deposits are free and processed within minutes. Note: wire withdrawals have a $25 fee."
    },
    {
      question: "What leverage does LMFX offer?",
      answer: "LMFX offers leverage up to 1:1000 on the Premium and Zero accounts, and up to 1:400 on the Fixed account. High leverage amplifies both profits and losses - use appropriate risk management."
    },
    {
      question: "Does LMFX have trading contests?",
      answer: "Yes! LMFX runs regular trading contests with prize pools up to $25,000. Both demo and live account contests are available, giving traders opportunities to win cash prizes."
    }
  ];

  const paymentMethods = [
    { name: "Bitcoin (BTC)", deposit: "Free", withdrawal: "Free", time: "10-60 minutes", recommended: true },
    { name: "USDT (Tether)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes", recommended: true },
    { name: "Ethereum (ETH)", deposit: "Free", withdrawal: "Free", time: "10-30 minutes", recommended: true },
    { name: "Credit/Debit Card", deposit: "Free", withdrawal: "Free", time: "Instant / 1-5 days" },
    { name: "Skrill", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Neteller", deposit: "Free", withdrawal: "Free", time: "Instant / 24 hours" },
    { name: "Bank Wire Transfer", deposit: "Free", withdrawal: "$25", time: "2-5 business days" },
  ];

  const communityFeedback = {
    positiveThemes: [
      "Accepts US clients without restrictions",
      "High leverage (1:1000) available",
      "Multiple deposit methods including crypto",
      "Regular trading contests with prizes",
      "Responsive customer support",
    ],
    negativeThemes: [
      "Offshore broker (not tier-1 regulated)",
      "MT4 only - no MT5 available",
      "Wire withdrawal fee ($25)",
    ],
    lastUpdated: "February 2026",
  };

  const pros = [
    "Fully accepts US clients",
    "High leverage up to 1:1000",
    "Multiple crypto deposit options (BTC, ETH, USDT)",
    "Established since 2015",
    "$25K trading contest prizes",
    "Zero spread account available",
    "Fixed spread option for news trading",
    "Negative balance protection",
    "Scalping and hedging allowed",
    "Expert Advisors fully supported",
    "24/5 responsive support",
  ];

  const cons = [
    "Offshore broker (St. Vincent registered)",
    "MT4 only - no MT5 platform",
    "Wire withdrawal fee ($25)",
    "Higher minimum for Fixed account ($250)",
    "Limited instrument selection",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="LMFX Review 2026 - US Accepted Broker with 1:1000 Leverage"
        description="Complete LMFX review for US traders. High leverage up to 1:1000, crypto deposits, $25K trading contests. Accepts US clients with no restrictions."
        canonical="/review/lmfx"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "LMFX",
            "url": brokers.lmfx.siteUrl,
            "description": "LMFX is an offshore forex broker accepting US clients with leverage up to 1:1000.",
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
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">US Accepted</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={brokers.lmfx} className="w-24 h-24 rounded-2xl" imgClassName="p-3" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                        LMFX Review
                      </h1>
                      <span className="px-2 py-1 text-xs font-bold bg-success/10 text-success rounded">US OK</span>
                    </div>
                    <p className="text-muted-foreground">Offshore Broker Since 2015 • High Leverage</p>
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
                  LMFX is an offshore forex broker established in 2015 that <strong className="text-success">fully accepts US clients</strong>. With leverage up to 1:1000, multiple crypto deposit options, and $25,000 trading contests, it's a solid choice for American traders seeking offshore alternatives.
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$50</div>
                    <div className="text-xs text-muted-foreground">Min Deposit</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">1:1000</div>
                    <div className="text-xs text-muted-foreground">Max Leverage</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-primary">0.0</div>
                    <div className="text-xs text-muted-foreground">Spread From</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-2xl font-bold text-success">US ✓</div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a
                      href={brokers.lmfx.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick("lmfx", "review_hero", "visit_site")}
                    >
                      Visit LMFX
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
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold text-foreground">2015</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span className="font-semibold text-foreground">St. Vincent</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-semibold text-primary">$50</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Max Leverage</span>
                      <span className="font-semibold text-primary">1:1000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Spreads</span>
                      <span className="font-semibold text-primary">From 0.0 pips</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Platform</span>
                      <span className="font-semibold text-foreground">MT4</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">US Clients</span>
                      <span className="font-semibold text-success">✓ Accepted</span>
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
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-success" />
                <span className="text-foreground font-medium">US Clients Accepted</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">1:1000 Leverage</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Bitcoin className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">Crypto Deposits</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">$25K Contests</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-6 bg-amber-500/5 border-b border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Risk Disclosure</h3>
                <p className="text-muted-foreground text-sm">
                  LMFX is an offshore broker registered in St. Vincent and the Grenadines. While they've operated since 2015 and accept US clients, trading with offshore brokers carries additional risks. Only trade with funds you can afford to lose and consider your risk tolerance before opening an account.
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
                How to Open an LMFX Account
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                US traders can open an account in minutes. Follow these simple steps.
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
                  href={brokers.lmfx.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("lmfx", "review_steps", "open_account")}
                >
                  Open LMFX Account Now
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
                LMFX vs Competitors
              </h2>
              <p className="text-muted-foreground">
                See how LMFX compares to other US-accepting brokers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <BrokerLogo broker={brokers.lmfx} className="w-8 h-8 rounded" imgClassName="p-1" />
                        <span className="font-bold text-primary">LMFX</span>
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
                        {row.lmfx === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.lmfx === false ? (
                          <span className="text-destructive">✕</span>
                        ) : (
                          <span className="font-medium text-primary">{row.lmfx}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor1 === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.competitor1 === false ? (
                          <span className="text-destructive">✕</span>
                        ) : (
                          <span className="text-foreground">{row.competitor1}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.competitor2 === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : row.competitor2 === false ? (
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
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Account Types
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                LMFX offers three account types to suit different trading styles
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
                        href={brokers.lmfx.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick("lmfx", "review_account_types", account.name)}
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
                Multiple options including crypto for fast, fee-free transactions
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
                      <td className="py-4 px-4 text-center">
                        <span className={method.withdrawal === "Free" ? "text-success" : "text-foreground"}>{method.withdrawal}</span>
                      </td>
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
                Common questions about LMFX answered
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Community Feedback
              </h2>
              <p className="text-muted-foreground">
                What traders are saying about LMFX
              </p>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
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
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm brokerName="LMFX" brokerId="lmfx" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Trade with LMFX?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open an account with $50 minimum deposit and access leverage up to 1:1000. US traders welcome!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href={brokers.lmfx.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("lmfx", "review_bottom", "open_account")}
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
              Risk Warning: Trading forex carries a high level of risk. LMFX is an offshore broker. Only trade with funds you can afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={brokers.lmfx.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick("lmfx", "review_sticky", "open_account")}
          >
            Open LMFX Account
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

export default LMFXReview;
